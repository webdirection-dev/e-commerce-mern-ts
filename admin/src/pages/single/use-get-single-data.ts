import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/hookRedux'
import { selectUsersInfo, getUserById } from '../../features/users/users-slice'
import { IList, IMovie, IUserRows, IUser } from '../../types/types'

type TPropsCard = IMovie | IUserRows | IList | IUser
interface IItemData {titleCard: string; props: TPropsCard}

export const useGetSingleData = () => {
    const location = useLocation()
    const dispatch = useAppDispatch();
    const {userById} = useAppSelector((state) => selectUsersInfo(state))
    const [data, setData] = useState({} as IItemData);

    useEffect(() => {
        const id = location.pathname.split('/').reverse()[0]

        if (location.state !== null) {
            const { props } = location.state as {props: TPropsCard}
            const path = location.pathname.split('/')[1]
            const titleCard = path[0].toUpperCase() + path.slice(1, path.length - 1)

            setData({titleCard, props})
        } else dispatch(getUserById(id))
    }, [])

    useEffect(() => {
        //проверка userById на пустоту
        let isEmpty = true
        for (let key in userById) {isEmpty = false}

        if (!isEmpty && userById) {
            setData({
                titleCard: 'User',
                props: userById as IUser,
            })
        }
    }, [userById])

    return data
}
