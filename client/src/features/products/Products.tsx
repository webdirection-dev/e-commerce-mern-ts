import React, {FC} from 'react'
import {useProducts} from './useProducts'
import './styles/Products.scss'

import ProductItem from "./ProductItem"
import {IProductFromMongo} from "../../static/types/productTypes"

import {preloader} from "../../static/img"
import {useLocation} from "react-router-dom";

const Products: FC = () => {
    const {productInfo, filteredProducts} = useProducts()

    return(
        <>
            {
                productInfo.status !== 'received' ?
                    <img className={'preloader'} src={preloader} alt="preloader"/> :

                productInfo.status === 'received' && productInfo.qty > 0 && filteredProducts.length > 0?
                    <div className='products'>
                        {
                            filteredProducts.map((i: IProductFromMongo) => (
                                <ProductItem key={i._id} {...i}/>
                            ))
                        }
                    </div>

                    : <span className='product-alert'>Unfortunately, this catalogue does not provide a description of the contents.</span>
            }
        </>
    )
}

export default Products