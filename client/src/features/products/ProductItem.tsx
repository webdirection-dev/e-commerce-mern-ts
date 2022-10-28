import React, { FC } from 'react'
import {Link} from "react-router-dom"
import './styles/ProductItem.scss'
import {motion} from 'framer-motion'

import { MdOutlineShoppingCart, MdSearch, MdFavoriteBorder } from "react-icons/md"
import {IProductFromMongo} from "../../static/types/productTypes"

interface IProductItem {
    productItem: IProductFromMongo
}

const ProductItem: FC<IProductItem> = ({productItem}) => (
    <motion.div
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        // transition={{duration: 2}}
        layout
        className='productItem'
    >
        <img src={productItem.img} alt=""/>

        <div className="productItem__info">
            <button className="productItem__icon">
                <MdOutlineShoppingCart />
            </button>

            <Link
                to={`/product/${productItem._id}`}
                className="productItem__icon"
            >
                <MdSearch />
            </Link>

            <button className="productItem__icon">
                <MdFavoriteBorder />
            </button>
        </div>
    </motion.div>
)

export default ProductItem