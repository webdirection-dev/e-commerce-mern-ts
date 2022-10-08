import {useLocation} from "react-router-dom"
import {ChangeEvent, useEffect, useState} from "react"
import {useAppDispatch} from "../../store"
import {getCategory, setFilters, setSorting} from "../../features/other/other-slice"

export const useVitrine = () => {
    const path = useLocation().pathname.split('/').reverse()[0]
    const dispatch = useAppDispatch()
    const [filter, setFilter] = useState({color: 'all', size: 'all'})

    const handleSort = (txt: string) => {
        dispatch(setSorting(txt))
    }

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        setFilter({
            ...filter,
            [name]: value
        })
    }

    useEffect(() => {
        //позволит смотреть страницу с ее начала иначе её автоскролит вниз
        window.scrollTo(0, 0);

        dispatch(getCategory(path))
    }, [path])

    useEffect(() => {
        dispatch(setFilters(filter))
    }, [filter])

    return {handleFilter, handleSort}
}