import React, { FC } from 'react'
import './Auth.scss'
import {useBgSmaller} from '../../static/hooks/useBgSmaller'

import {bgLogin} from "../../static/img"

const Login: FC = () => {
    const {src, className} = useBgSmaller(bgLogin)

    return(
        <section className='auth'>
            <div className="wrapper login-wrapper">
                <h1>sign in</h1>

                <form className='login-form'>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                </form>

                <button className='login-btn'>login</button>
                <a href="#">do not you remember the password?</a>
                <a href="#">create a new account</a>
            </div>

            <img src={src} alt="..." className={className + ' login-bg'}/>
        </section>
    )
}

export default Login