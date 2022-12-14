import React, {FC, Dispatch, SetStateAction} from 'react'
import {Link} from "react-router-dom"
import './styles/ProductItem.scss'
import {motion} from 'framer-motion'
import {useAppDispatch, useAppSelector} from "../../store"
import {addToWishlist, selectFindById} from "../wishlist/wishlist-slice"
import {setProductForPopup} from "./product-slice"

import { MdAddShoppingCart, MdSearch, MdFavoriteBorder, MdFavorite } from "react-icons/md"
import {IProductFromMongo} from "../../static/types/mongoTypes"

interface IProductItem {
    productItem: IProductFromMongo;
    handlePopup:  (act: string) => void;
    setIsOpenWishlist: Dispatch<SetStateAction<boolean>>;
}

const ProductItem: FC<IProductItem> = ({productItem, handlePopup, setIsOpenWishlist}) => {
    const dispatch = useAppDispatch()
    const {isUnique} = useAppSelector(store => selectFindById(store, productItem._id))

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
                    <MdAddShoppingCart />
                </Link>

                <button className="productItem__icon" onClick={() => {
                    dispatch(setProductForPopup(productItem))
                    handlePopup('hidden')
                }}>
                    <MdSearch />
                </button>

                <button
                    className="productItem__icon"
                    onClick={() => {
                        dispatch(addToWishlist(productItem))
                        if (!isUnique) setIsOpenWishlist(true)
                    }}
                >
                    {
                        isUnique
                            ? <MdFavorite style={{color: 'red'}}/>
                            : <MdFavoriteBorder />
                    }
                </button>
            </div>
        </motion.div>
    )
}

export default ProductItem