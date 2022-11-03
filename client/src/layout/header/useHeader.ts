import {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store"
import {resetState} from "../../features/products/product-slice"
import {selectCartInfo} from "../../features/cart/cart-slice"
import {selectWishlistInfo} from "../../features/wishlist/wishlist-slice"
import {MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite} from 'react-icons/md'

export const useHeader = () => {
    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const {itemsLength} = useAppSelector(store => selectWishlistInfo(store))
    const [isWishlist, setWishlist] = useState(false)

    const handleReset = () => { if (location !== '/') dispatch(resetState()) }

    useEffect(() => {
        if (itemsLength > 0) setWishlist(true)
        else setWishlist(false)
    }, [itemsLength])

    return {isWishlist, itemsLength, quantityAllItems, handleReset, MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite}
}