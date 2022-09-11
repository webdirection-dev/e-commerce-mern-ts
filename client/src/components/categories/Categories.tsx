import React, { FC } from 'react'

import './Categories.scss'
import {useCategories} from './useCategories'
import {categoriesData} from "../../static/data/categories-data"
import CategoryItem from "../categoryItem/CategoryItem"

interface ICategoriesProps {}

const Categories: FC<ICategoriesProps> = () => {
    const {} = useCategories

    return(
        <div className='categories'>
            {
                categoriesData.map(i => (
                    <CategoryItem key={i.id} {...i}/>
                ))
            }
        </div>
    )
}

export default Categories