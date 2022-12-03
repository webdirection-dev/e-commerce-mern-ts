import {useEffect, useState} from "react"

import {useAppDispatch, useAppSelector} from "../../static/hooks/hookRedux"
import {loadStats, loadUsers, getNewUsers} from "../../features/users/users-slice"
import {loadOrders, getIncome} from "../../features/orders/orders-slice"
import {getProducts} from "../../features/products/products-slice"

import {useChangeTheme} from "./use-change-theme"
import {selectAuthInfo} from "../../features/auth/auth-slice"

export const useApp = () => {
    const dispatch = useAppDispatch()
    const {auth, currentUser} = useAppSelector(store => selectAuthInfo(store))
    const [dark, setDark] = useState(false);
    useChangeTheme(dark)

    useEffect(() => {
        if (currentUser) {
            const token = currentUser.accessToken as string;

            dispatch(loadUsers(token))
            dispatch(getNewUsers(token))
            dispatch(loadStats(token))
            dispatch(loadOrders(token))
            dispatch(getIncome(token))
            dispatch(getProducts())
        }
    }, [currentUser])

    return {auth, dark, setDark}
}
