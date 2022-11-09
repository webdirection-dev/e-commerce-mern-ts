import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

import {useAppDispatch, useAppSelector} from "../../../hooks/hookRedux"
import {updateMoviesList} from "../movies-list-slice"
import {selectAllMovies} from "../../movies/movies-slice"

export const useMoviesListCard = (_id: string, type: string, content: string[]) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => selectAllMovies(state))

    const [isEdit, setIsEdit] = useState(false)
    const [updateMovie, setUpdateMovie] = useState({type, content})

    const handleEdit = () => {
        if (!isEdit) setIsEdit(true)
        else navigate('../')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUpdateMovie({
            ...updateMovie,
            [name]: value
        })
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(updateMoviesList({_id, updateMovie}))
        navigate('../')
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name} = e.target

        let value = Array.from(e.target.selectedOptions, i => i.value)

        if (value.length > 0) {
            setUpdateMovie({
                ...updateMovie,
                [name]: value
            })
        }
        if (value.length < 1) {
            setUpdateMovie({
                ...updateMovie,
                [name]: content
            })
        }
    }

    return {isEdit, handleChange, handleUpdate, handleEdit, handleSelect, movies}
}