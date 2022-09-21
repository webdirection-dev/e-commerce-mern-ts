import React, { FC } from 'react'
import './Register.scss'
import {useRegister} from './useRegister'
import {useBgSmaller} from "./useBgSmaller"

interface IRegisterProps {}

const Register: FC<IRegisterProps> = () => {
    const {className, src} = useBgSmaller()
    const {} = useRegister()

    return(
        <section className='register'>
            <div className="wrapper">
                <h1>create an account</h1>

                <form>
                    <input type="text" placeholder='name'/>
                    <input type="text" placeholder='last name'/>
                    <input type="text" placeholder='username'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <input type="password" placeholder=' confirm password'/>
                </form>


                <span>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                <button>create</button>
            </div>

            <img src={src} alt="..." className={className}/>
        </section>
    )
}

export default Register