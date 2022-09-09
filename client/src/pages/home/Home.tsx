import React, { FC } from 'react'

import './home.scss'
import {useHome} from './useHome'

import Navbar from '../../components/navbar/Navbar'
import Announcement from '../../components/announcement/Announcement'
import Slider from "../../components/slider/Slider"

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const {} = useHome

    return(
        <>
            <Navbar />
            <Announcement />
            <Slider />
        </>
    )
}

export default Home