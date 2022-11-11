import {useNavigate} from "react-router-dom"
import React, {useEffect, useState} from "react"

import {useAppDispatch, useAppSelector} from "../../../static/hooks/hookRedux"
import {createMoviesList} from "../movies-list-slice"
import {selectAllMovies} from "../../movies/movies-slice"

interface IList {
    [key: string]: string | string[]
}

export const useMoviesList = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => selectAllMovies(state))

    const [movieList, setMovieList] = useState({} as IList)
    const [isAllReady, setIsAllReady] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setMovieList({
            ...movieList,
            [name]: value
        })
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name} = e.target

        let value = Array.from(e.target.selectedOptions, i => i.value)

        setMovieList({
            ...movieList,
            [name]: value
        })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (isAllReady) {
            dispatch(createMoviesList(movieList))
            navigate('../')
        } else navigate('../')
    }

    useEffect(() => {
        for (let key in movieList) {
            if (
                (movieList.title && movieList.title !== '') &&
                (movieList.genre && movieList.genre !== '') &&
                movieList.content
            ) setIsAllReady(true)
            else setIsAllReady(false)
        }
    }, [movieList])

    return {
        isAllReady,
        movies,
        handleChange,
        handleSelect,
        handleSubmit,
    }
}