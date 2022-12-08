import {useEffect, useState} from "react"
import {useAppSelector} from "../../store"
import {selectCartInfo} from "./cart-slice"
import {selectWishlistInfo} from "../wishlist/wishlist-slice"

export const useCart = () => {
    const {products, productsLength} = useAppSelector(store => selectCartInfo(store))
    const {itemsLength} = useAppSelector(store => selectWishlistInfo(store))
    const [totalCart, setTotalCart] = useState(0)

    useEffect(() => {
        const out = products.reduce((prev, next) => prev + (next.price * next.quantityThisProduct), 0)
        setTotalCart(out)
    }, [products])

    return {products, totalCart, productsLength, itemsLength}
}
