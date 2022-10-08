import React, { FC } from 'react'
import './Home.scss'
import {useHome} from './useHome'

import BreakLine from "../../components/breakLine/BreakLine"
import Slider from "../../components/slider/Slider"
import Categories from "../../components/categories/Categories"
import Products from "../../features/products/Products"
import Newsletter from "../../components/newsletter/Newsletter"

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const {} = useHome

    return(
        <div className='home'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>
            <Slider auto={true}/>
            <BreakLine txt='Categories'/>
            <Categories />
            <BreakLine txt='Popular Products'/>
            <Products />
            <Newsletter />
        </div>
    )
}

export default Home