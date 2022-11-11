import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../static/hooks/hookRedux'
import { selectUsersInfo, getUserById } from '../../features/users/users-slice'

import {isEmptyObject} from "../../static/helpers/functionsForObjects"
import { IList, IMovie, IUserRows, IUser } from '../../static/types/types'

type TPropsCard = IMovie | IUserRows | IList | IUser
interface IItemData {titleCard: string; dataCard: TPropsCard}
interface IPropsFromDataTable {propsFromDataTable: {data: TPropsCard}}
interface IPropsFromWidgetSmall {propsFromWidgetSmall: {data: TPropsCard}}

export const useGetSingleData = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {userById} = useAppSelector((state) => selectUsersInfo(state))
    const [data, setData] = useState({} as IItemData)

    const path = location.pathname.split('/')[1]
    const titleCard = path[0].toUpperCase() + path.slice(1, path.length - 1)
    const id = location.pathname.split('/').reverse()[0]

    useEffect(() => {
        if (location.state && location.state.propsFromDataTable) {
            console.log('propsFromDataTable')
            const {propsFromDataTable}  = location.state as IPropsFromDataTable
            setData({titleCard, dataCard: propsFromDataTable.data})
        }

        if (location.state && location.state.propsFromWidgetSmall) {
            console.log('propsFromWidgetSmall')
            const {propsFromWidgetSmall}  = location.state as IPropsFromWidgetSmall
            setData({titleCard, dataCard: propsFromWidgetSmall.data})
        }

        if (!location.state.propsFromDataTable && !location.state.propsFromWidgetSmall) {
            console.log('fetch')

            // todo проверить фетчинг при обновлении страницы на сервере
            dispatch(getUserById(id))
        }
    }, [])

    useEffect(() => {
        //проверка userById на пустоту
        const isEmpty = isEmptyObject(userById)

        if (!isEmpty && userById) {
            setData({
                titleCard,
                dataCard: userById as TPropsCard,
            })
        }
    }, [userById])

    return data
}
