import {useEffect, useState} from "react"

import {useAppDispatch, useAppSelector} from "../../store"
import {getProducts, selectAllProduct, selectProductsInfo} from "./product-slice"

import {IProductFromMongo} from "../../static/types/productTypes"
import {IProductProps} from "./Products"

export const useProducts = ({category, filter, sort}: IProductProps) => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => selectAllProduct(state))
    const productInfo = useAppSelector(state => selectProductsInfo(state))
    const [filteredProducts, setFilteredProducts] = useState([] as IProductFromMongo[])
    const [isPopup, setIsPopup] = useState(false)

    const handlePopup = (act: string) => {
        document.body.style.overflow = `${act}`
        setIsPopup(!isPopup)
    }

    useEffect(() => {
        const path = category ? '/products?category='+category : '/products?random='+productInfo.random
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

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
            )
        }

        if (sort === 'asc') setFilteredProducts( prev => [...prev].sort((a, b) => a.price - b.price))
        if (sort === 'desc') setFilteredProducts( prev => [...prev].sort((a, b) => b.price - a.price))
    }, [sort])

    return {productInfo, filteredProducts, isPopup, handlePopup}
}