import {useAppDispatch, useAppSelector} from "../../store"
import {selectCartInfo} from "./cart-slice"
import {useEffect, useState} from "react";

export const useCart = () => {
    const dispatch = useAppDispatch()
    const {products} = useAppSelector(store => selectCartInfo(store))
    const [totalCart, setTotalCart] = useState(0)

    useEffect(() => {
        const out = products.reduce((prev, next) => prev + (next.price * next.quantityThisProduct), 0)
        setTotalCart(out)
    }, [products])

    return {products, totalCart}
}