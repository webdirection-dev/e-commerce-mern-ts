import React, {FC} from 'react'
import {useProducts} from './useProducts'
import './styles/Products.scss'

import ProductItem from "./ProductItem"
import {IProductFromMongo} from "../../static/types/productTypes"

import {preloader} from "../../static/img"

export interface IProductProps {
    category?: string;
    filter?: {[key: string]: string};
    sort?: string;
}

const Products: FC<IProductProps> = (props) => {
    const {productInfo, filteredProducts} = useProducts({...props})

    return(
        <>
            {
                productInfo.status !== 'received' || !Array.isArray(filteredProducts)
                ? <img className={'preloader'} src={preloader} alt="preloader"/>

                : productInfo.status === 'received' && productInfo.qty > 0 && filteredProducts.length > 0
                ? <div className='products'>
                        {
                            Array.isArray(filteredProducts) && filteredProducts.map((i: IProductFromMongo) => (
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