import {useState} from "react"
import {categoriesData} from "../../static/data/categories-data"
import {MdArrowLeft, MdArrowRight} from "react-icons/md"

export const useCategories = () => {
    const [count, setCount] = useState(0)

    const handleClick = (direction: string) => {
        const length = categoriesData.length
        if (direction === 'left') {
            if (count > 0) setCount(count -1)
        }

        if (direction === 'right') {
            if (count < length -3) setCount(count +1)
        }
    }

    return {categoriesData, count, handleClick, MdArrowLeft, MdArrowRight}
}