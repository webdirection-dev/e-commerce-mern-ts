import React, { FC } from 'react'

import './CategoryItem.scss'

interface ICategoryItemProps {
    id: number,
    img: string,
    title: string
}

const CategoryItem: FC<ICategoryItemProps> = ({img, title}) => (
    <div className='categoryItem'>
        <img src={img} alt={title}/>

        <div className="categoryItem__info">
            <h1>{title}</h1>

            <button>show now</button>
        </div>
    </div>
)

export default CategoryItem