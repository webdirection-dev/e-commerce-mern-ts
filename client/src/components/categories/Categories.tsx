import React, {FC} from 'react'

import './Categories.scss'
import {useCategories} from './useCategories'
import {categoriesData} from "../../static/data/categories-data"
import CategoryItem from "../categoryItem/CategoryItem"
import {MdArrowLeft, MdArrowRight} from "react-icons/md";

interface ICategoriesProps {}

const Categories: FC<ICategoriesProps> = () => {
    const {count, handleClick} = useCategories()

    return(
        <div className='categories'>
            <ul className='categories__wrapper' style={{transform: `translateX(calc(-33.33vw * ${count}))`}}>
                {
                    categoriesData.map((i: any) => {
                        return <CategoryItem key={Math.random()} {...i}/>
                    })
                }
            </ul>

            <button
                id='categories-left'
                className={count > 0 ? 'slider__btn' : 'hide'}
                onClick={() => handleClick('left')}
            ><MdArrowLeft /></button>

            <button
                id='categories-right'
                className={count < categoriesData.length -3 ? 'slider__btn' : 'hide'}
                onClick={() => handleClick('right')}
            ><MdArrowRight /></button>
        </div>
    )
}

export default Categories