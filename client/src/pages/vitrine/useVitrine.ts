import {useLocation} from "react-router-dom"
import {ChangeEvent, useEffect, useState} from "react"

export const useVitrine = () => {
    const path = useLocation().pathname.split('/').reverse()[0]
    const [filter, setFilter] = useState({color: 'all', size: 'all'})
    const [sort, setSort] = useState('newest')

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        setFilter({...filter, [name]: value})
    }

    //позволит смотреть страницу с ее начала иначе её автоскролит вниз
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return {path, filter, sort, handleFilter, setSort}
}