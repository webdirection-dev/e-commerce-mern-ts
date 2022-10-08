import React, { FC } from 'react'
import './styles/ProductItem.scss'

import { MdOutlineShoppingCart, MdSearch, MdFavoriteBorder } from "react-icons/md"

import {IProductFromMongo} from "../../static/types/productTypes"


const ProductItem: FC<IProductFromMongo> = ({img}) => (
    <div className='productItem'>
        <img src={img} alt=""/>

        <div className="productItem__info">
            <button className="productItem__icon">
                <MdOutlineShoppingCart />
            </button>

            <button className="productItem__icon">
                <MdSearch />
            </button>

            <button className="productItem__icon">
                <MdFavoriteBorder />
            </button>
        </div>
    </div>
)

export default ProductItem