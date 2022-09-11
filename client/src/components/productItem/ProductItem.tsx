import React, { FC } from 'react'

import './ProductItem.scss'
import {useProductItem} from './useProductItem'

import { MdOutlineShoppingCart, MdSearch, MdFavoriteBorder } from "react-icons/md"

interface IProductItemProps {
    id: number,
    img: string
}

const ProductItem: FC<IProductItemProps> = ({img}) => {
    const {} = useProductItem

    return(
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
}

export default ProductItem