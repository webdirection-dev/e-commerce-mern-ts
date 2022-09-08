import React, { FC } from 'react'

import {useHome} from './useHome'
import Navbar from '../../components/navbar/Navbar'

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const {} = useHome

    return(
        <>
            <Navbar />
        </>
    )
}

export default Home