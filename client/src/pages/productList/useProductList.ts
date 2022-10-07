import {useLocation} from "react-router-dom"
import {ChangeEvent, useEffect, useState} from "react"

export const useProductList = () => {
    const category = useLocation().pathname.split('/').reverse()[0]
    const [filter, setFilter] = useState({color: 'all', size: 'all'})
    const [sort, setSort] = useState('newest')

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
    }, [])

    return {handleFilter, setSort, category, filter, sort}
}