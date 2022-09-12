import React, { FC } from 'react'

import './Newsletter.scss'
import {useNewsletter} from './useNewsletter'

interface INewsletterProps {}

const Newsletter: FC<INewsletterProps> = () => {
    const {} = useNewsletter

    return(
        <div className='newsletter'>
            Newsletter Component
        </div>
    )
}

export default Newsletter