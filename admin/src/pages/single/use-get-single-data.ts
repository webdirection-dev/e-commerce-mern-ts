import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../static/hooks/hookRedux'
import { selectUsersInfo, getUserById } from '../../features/users/users-slice'
import {selectProductInfo, getProductById} from "../../features/products/products-slice"

import {isEmptyObject} from "../../static/helpers/functionsForObjects"
import {IUser, IProduct} from '../../static/types/typesMongo'

type TPropsCard = IUser | IProduct

interface IUserData {titleCard: string; dataCard: TPropsCard}
interface IUserFromDataTable {propsFromDataTable: {data: TPropsCard}}
interface IUserFromWidgetSmall {propsFromWidgetSmall: {data: TPropsCard}}

export const useGetSingleData = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {userById} = useAppSelector((state) => selectUsersInfo(state))
    const {productById} = useAppSelector((state) => selectProductInfo(state))
    const [data, setData] = useState({} as IUserData)

    const path = location.pathname.split('/')[1]
    const titleCard = path[0].toUpperCase() + path.slice(1, path.length - 1)
    const id = location.pathname.split('/').reverse()[0]

    useEffect(() => {
        if (location.state && location.state.propsFromDataTable) {
            const {propsFromDataTable}  = location.state as IUserFromDataTable
            setData({titleCard, dataCard: propsFromDataTable.data})
        }

        if (location.state && location.state.propsFromWidgetSmall) {
            const {propsFromWidgetSmall}  = location.state as IUserFromWidgetSmall
            setData({titleCard, dataCard: propsFromWidgetSmall.data})
        }

        if (!location.state.propsFromDataTable && !location.state.propsFromWidgetSmall) {
            if (titleCard === 'User') dispatch(getUserById(id))
            if (titleCard === 'Product') dispatch(getProductById(id))
        }
    }, [])

    useEffect(() => {
        const obj = titleCard === 'User' ? userById : productById
        //проверка userById на пустоту
        const isEmpty = isEmptyObject(obj)

        if (!isEmpty && obj) {
            setData({
                titleCard,
                dataCard: obj as TPropsCard,
            })
        }
    }, [userById, productById])

    return data
}
