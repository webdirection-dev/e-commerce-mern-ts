import React, {FC} from 'react'
import './Categories.scss'
import {useCategories} from './useCategories'
import CategoryItem from "../categoryItem/CategoryItem"

interface ICategoriesProps {}

const Categories: FC<ICategoriesProps> = () => {
    const {categoriesData, count, handleClick, MdArrowLeft, MdArrowRight} = useCategories()

    return(
        <section className='categories'>
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
        </section>
    )
}

export default Categories