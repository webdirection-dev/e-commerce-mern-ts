import {useEffect, useState} from "react"

import {useAppDispatch, useAppSelector} from "../../store"
import {getProducts, selectAllProduct, selectProductsInfo} from "./product-slice"
import {selectOtherInfo} from "../other/other-slice"

import {IProductFromMongo} from "../../static/types/productTypes"

export const useProducts = () => {
    const dispatch = useAppDispatch()
    const {category, filter, sort} = useAppSelector(state => selectOtherInfo(state))
    // TODO: Сделать ресет для стейта Other
    // console.log(category, filter, sort)
    const products = useAppSelector(state => selectAllProduct(state))
    const productInfo = useAppSelector(state => selectProductsInfo(state))
    const [filteredProducts, setFilteredProducts] = useState([] as IProductFromMongo[])

    useEffect(() => {
        const path = category ? `/products?category=${category}` : '/products'
        dispatch(getProducts(path))
    }, [category])

    useEffect(() => {

        if (category && filter) {
            Array.isArray(products) && setFilteredProducts(
                 products.filter(
                    (item: any) => Object.entries(filter).every(([key, value]) => filter[key] === 'all' || item[key].includes(value))
                )
            )
        } else setFilteredProducts(products)

        // VAR II
        // if (category) {
        //     let out = products
        //
        //     if (color !== 'all') out = out.filter(i => i.color.includes(color))
        //     if (size !== 'all') out = out.filter(i => i.size.includes(size))
        //
        //     setFilteredProducts(out)
        // } else setFilteredProducts(products)
    }, [category, products, filter])

    return {productInfo, filteredProducts}
}