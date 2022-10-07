import {useEffect, useState} from "react"
import axios from "axios"

import {IProductsProps} from "./Products"

const PATH = process.env.REACT_APP_API_URL

interface IColorOrSize {[key: string]: string[]}

export const useProducts = ({category, filter, sort}: IProductsProps) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const getUrl = category ? PATH + `/products?category=${category}` : PATH + '/products'

        const getProducts = async () => {
            try {
                const res = await axios.get(getUrl)
                setProducts(res.data)
            }
            catch (err) { console.log(err) }
        }

        getProducts()
    }, [category])

    useEffect(() => {
        if (category && filter) {
            setFilteredProducts(
                products.filter(
                    (item: IColorOrSize) => Object.entries(filter) .every(([key, value]) => filter[key] === 'all' || item[key].includes(value))
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

    return {filteredProducts}
}