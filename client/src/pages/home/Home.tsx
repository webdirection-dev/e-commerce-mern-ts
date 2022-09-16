import React, { FC } from 'react'

import './home.scss'
import {useHome} from './useHome'

import Navbar from '../../components/navbar/Navbar'
import Slider from "../../components/slider/Slider"
import Categories from "../../components/categories/Categories"
import Products from "../../components/products/Products"
import Newsletter from "../../components/newsletter/Newsletter"

import BreakLine from '../../components/breakLine/BreakLine'

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const {} = useHome

    return(
        <>
            <Navbar />
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>
            <Slider auto={true}/>
            <BreakLine txt='Categories'/>
            <Categories />
            <BreakLine txt='Popular Products'/>
            <Products />
            <BreakLine txt='Newsletter'/>
            <Newsletter />
        </>
    )
}

export default Home