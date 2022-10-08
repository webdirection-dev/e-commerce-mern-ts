import React, {FC, useEffect} from 'react'
import {Link} from "react-router-dom"
import './CategoryItem.scss'
import {resetState} from "../../features/products/product-slice"
import {useAppDispatch} from "../../store";

interface ICategoryItemProps {
    id: number,
    img: string,
    title: string,
    category: string,
}

const CategoryItem: FC<ICategoryItemProps> = ({img, title, category}) => {
    const dispatch = useAppDispatch()

    return (
        <li className='categoryItem'>
            <div>
                <img src={img} alt={title}/>

                <div className="categoryItem__info">
                    <h1>{title}</h1>

                    <Link
                        to={`/products/${category}`}
                        onClick={() => dispatch(resetState())}
                    >
                        show now
                    </Link>
                    {/*<button>show now</button>*/}
                </div>
            </div>
        </li>
    )
}

export default CategoryItem