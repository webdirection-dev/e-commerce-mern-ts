import React, {FC} from 'react'
import {useProducts} from './useProducts'
import './Products.scss'

import ProductItem from "../productItem/ProductItem"
import {IProductFromMongo} from "../../static/types/productTypes"


export interface IProductsProps {
    category?: string;
    filter?: {[key: string]: string} ;
    sort?: string;
}

const Products: FC<IProductsProps> = (props) => {
    const {filteredProducts} = useProducts(props)

    return(
        <div className='products'>
            {
                filteredProducts.map((i: IProductFromMongo) => (
                    <ProductItem key={i._id} {...i}/>
                ))
            }
        </div>
    )
}

export default Products