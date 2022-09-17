import React, { FC } from 'react'
import './Newsletter.scss'
import {useNewsletter} from './useNewsletter'

import { MdSend } from "react-icons/md";

interface INewsletterProps {}

const Newsletter: FC<INewsletterProps> = () => {
    const {} = useNewsletter

    return(
        <section className='newsletter'>
            <h1>Newsletter</h1>
            <div className="newsletter__description">Get timely updates from your favorite products.</div>
            <form>
                <input
                    type="text"
                    placeholder='Your email'
                />
                <button><MdSend /></button>
            </form>
        </section>
    )
}

export default Newsletter