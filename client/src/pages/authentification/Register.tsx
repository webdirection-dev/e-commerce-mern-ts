import React, { FC } from 'react'
import './Auth.scss'
import {useBgSmaller} from "../../static/hooks/useBgSmaller"

import {bgRegister} from "../../static/img"
import {Link} from "react-router-dom";

const Register: FC = () => {
    const {className, src} = useBgSmaller(bgRegister)

    return(
        <section className='auth'>
            <div className="wrapper">
                <h1>create an account</h1>

                <form>
                    <input type="text" placeholder='name'/>
                    <input type="text" placeholder='last name'/>
                    <input type="text" placeholder='username'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <input type="password" placeholder='confirm password'/>
                </form>


                <span>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                <Link to='/login'>login</Link>
                <button>create</button>
            </div>

            <img src={src} alt="..." className={className}/>
        </section>
    )
}

export default Register