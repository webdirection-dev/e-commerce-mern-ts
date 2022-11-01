import React, {FC, useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import './styles/ProductItem.scss'
import {motion} from 'framer-motion'
import {useAppDispatch, useAppSelector} from "../../store"
import {addToWishlist, selectWishlistInfo} from "../wishlist/wishlist-slice"

import { MdOutlineShoppingCart, MdSearch, MdFavoriteBorder, MdFavorite } from "react-icons/md"
import {IProductFromMongo} from "../../static/types/productTypes"

interface IProductItem {
    productItem: IProductFromMongo
}

const ProductItem: FC<IProductItem> = ({productItem}) => {
    const dispatch = useAppDispatch()
    const {items} = useAppSelector(store => selectWishlistInfo(store))
    const [isInWishlist, setIsInWishlist] = useState(false)

    useEffect(() => {
        const item = items.find(item => item._id === productItem._id)
        if (item) setIsInWishlist(true)
    }, [items])

    return(
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
                <Link
                    to={`/product/${productItem._id}`}
                    className="productItem__icon"
                >
                    <MdOutlineShoppingCart />
                </Link>

                <button className="productItem__icon">
                    <MdSearch />
                </button>

                <button className="productItem__icon" onClick={() => dispatch(addToWishlist(productItem))}>
                    {
                        isInWishlist
                            ? <MdFavorite style={{color: 'red'}}/>
                            : <MdFavoriteBorder />
                    }
                </button>
            </div>
        </motion.div>
    )
}

export default ProductItem