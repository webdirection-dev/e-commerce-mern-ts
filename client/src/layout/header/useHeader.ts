import {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"

import {useAppDispatch, useAppSelector} from "../../store"
import {resetState} from "../../features/products/product-slice"
import {singOut} from "../../features/auth/auth-slice"
import {selectCartInfo} from "../../features/cart/cart-slice"
import {selectWishlistInfo} from "../../features/wishlist/wishlist-slice"
import {selectAuthInfo} from "../../features/auth/auth-slice"

import {MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite} from 'react-icons/md'

export const useHeader = () => {
    const {auth} = useAppSelector(store => selectAuthInfo(store))
    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const {itemsLength} = useAppSelector(store => selectWishlistInfo(store))
    const [isWishlist, setWishlist] = useState(false)

    const handleReset = () => { if (location !== '/') dispatch(resetState()) }
    const handleSingOut = () => {dispatch(singOut())}

    useEffect(() => {
        if (itemsLength > 0) setWishlist(true)
        else setWishlist(false)
    }, [itemsLength])

    return {auth, isWishlist, itemsLength, quantityAllItems, handleReset, handleSingOut, MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite}
}