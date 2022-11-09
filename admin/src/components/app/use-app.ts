import {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../hooks/hookRedux"
import {selectAuthInfo} from "../../features/auth/auth-slice"

import {loadStats, loadUsers, sortUsersByNew} from "../../features/users/users-slice"
import {loadMovies} from "../../features/movies/movies-slice"

import {loadMoviesLists} from "../../features/lists/movies-list-slice"

import {useChangeTheme} from "./use-change-theme"

export const useApp = () => {
    const dispatch = useAppDispatch()
    const {auth, currentUser} = useAppSelector(store => selectAuthInfo(store))

    const [dark, setDark] = useState(false)
    useChangeTheme(dark)

    useEffect(() => {
        if (currentUser) {
            const token = currentUser.accessToken as string

            dispatch(loadUsers(token))
            dispatch(sortUsersByNew(token))
            dispatch(loadStats(token))
            dispatch(loadMovies(token))
            dispatch(loadMoviesLists(token))
        }
    }, [currentUser]);

    return {auth, dark, setDark}
}