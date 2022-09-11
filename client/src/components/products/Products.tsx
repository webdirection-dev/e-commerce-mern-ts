import React, { FC } from 'react'

import './Products.scss'
import {useProducts} from './useProducts'
import {popularProducts} from "../../static/data/products-data"
import ProductItem from "../productItem/ProductItem"

interface IProductsProps {}

const Products: FC<IProductsProps> = () => {
    const {} = useProducts

    return(
        <div className='products'>
            {
                popularProducts.map(i => (
                    <ProductItem key={i.id} {...i}/>
                ))
            }
        </div>
    )
}

export default Products