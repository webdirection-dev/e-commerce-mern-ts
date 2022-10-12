import React, { FC } from 'react'
import './styles/ProductItem.scss'
import {motion} from 'framer-motion'

import { MdOutlineShoppingCart, MdSearch, MdFavoriteBorder } from "react-icons/md"

import {IProductFromMongo} from "../../static/types/productTypes"


const ProductItem: FC<IProductFromMongo> = ({img}) => (
    <motion.div
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        // transition={{duration: 2}}
        layout
        className='productItem'
    >
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
    </motion.div>
)

export default ProductItem