import React, {FC} from 'react'
import {useProductList} from './useProductList'
import './ProductList.scss'

import BreakLine from "../../components/breakLine/BreakLine"
import Products from "../../components/products/Products"
import Newsletter from "../../components/newsletter/Newsletter"

const ProductList: FC = () => {
    const {handleFilter, setSort, category, filter, sort} = useProductList()

    return(
        <div className='productList'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>
            <h1 className='productList__title'>Dresses</h1>

            <ul className='productList__filter'>
                <li>
                    <label>Filter Products:</label>

                    <select
                        name="color"
                        onChange={e => handleFilter(e)}
                    >
                        <option value="all">Color</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                    </select>

                    <select
                        name="size"
                        onChange={e => handleFilter(e)}
                    >
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

                    <select
                        name="sort"
                        onChange={e => setSort(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="asc">Prise (asc)</option>
                        <option value="desc">Prise (desc)</option>
                    </select>
                </li>
            </ul>

            <Products category={category} filter={filter} sort={sort}/>
            <Newsletter />
        </div>
    )
}

export default ProductList