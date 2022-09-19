import React, { FC } from 'react'
import './ProductList.scss'
import {useProductList} from './useProductList'

import BreakLine from "../../components/breakLine/BreakLine"
import Products from "../../components/products/Products"
import Newsletter from "../../components/newsletter/Newsletter"

interface IProductListProps {}

const ProductList: FC<IProductListProps> = () => {
    const {} = useProductList

    return(
        <div className='productList'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>
            <h1 className='productList__title'>Dresses</h1>

            <ul className='productList__filter'>
                <li>
                    <label>Filter Products:</label>

                    <select name="filter">
                        <option value="all">Color</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                    </select>

                    <select name="size">
                        <option value="all">Size</option>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>
                </li>

                <li>
                    <label>Sort Products:</label>

                    <select name="sort">
                        <option value="new">Newest</option>
                        <option value="asc">Prise (asc)</option>
                        <option value="desc">Prise (desc)</option>
                    </select>
                </li>
            </ul>

            <Products />
            <Newsletter />
        </div>
    )
}

export default ProductList