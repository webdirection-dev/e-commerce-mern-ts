import React, { FC } from 'react'

import BreakLine from '../../components/breakLine/BreakLine'

import Slider from "../../components/slider/Slider"
import Categories from "../../components/categories/Categories"
import Products from "../../components/products/Products"
import Newsletter from "../../components/newsletter/Newsletter"

const Main: FC = () => (
    <main>
        <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>
        <Slider auto={true}/>
        <BreakLine txt='Categories'/>
        <Categories />
        <BreakLine txt='Popular Products'/>
        <Products />
        <Newsletter />
    </main>
)

export default Main