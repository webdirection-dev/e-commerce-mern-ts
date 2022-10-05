import React, { FC } from 'react'
import {Link} from "react-router-dom"
import './CategoryItem.scss'

interface ICategoryItemProps {
    id: number,
    img: string,
    title: string,
    category: string,
}

const CategoryItem: FC<ICategoryItemProps> = ({img, title, category}) => (
    <li className='categoryItem'>
        <Link to={`/products/${category}`}>
            <img src={img} alt={title}/>

            <div className="categoryItem__info">
                <h1>{title}</h1>

                <button>show now</button>
            </div>
        </Link>
    </li>
)

export default CategoryItem