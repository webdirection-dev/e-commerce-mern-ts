import {useAppSelector, useAppDispatch} from "../../store"
import {selectProductForPopup, resetProductForPopup} from "../../features/products/product-slice"

const myVariant = {
    hidden: {x: 1000, opacity: 0, height: 0},
    visible: {x: 0, opacity: 1, height: 'auto'},
    end: {height: 0}
}

export const usePopup = () => {
    const dispatch = useAppDispatch()
    const productForPopup = useAppSelector(store => selectProductForPopup(store))

    const handleResetPopup = () => {
        dispatch(resetProductForPopup())
        document.body.style.overflow = 'auto'
    }

    return {myVariant, handleResetPopup, ...productForPopup}
}