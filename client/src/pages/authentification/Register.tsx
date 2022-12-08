import React, { FC } from 'react'
import {Link} from "react-router-dom"
import './Auth.scss'

import {bgRegister} from "../../static/img"
import {useLogin} from "./hooks/use-login"
import {useRegister} from "./hooks/use-register"
import {useBgSmaller} from "../../static/hooks/useBgSmaller"

const Register: FC = () => {
    const {className, src} = useBgSmaller(bgRegister)
    const {handleReset} = useLogin()
    const {handleChange, handleCreateUser, isError} = useRegister()

    return(
        <>
            <section className='auth'>
                <div className="wrapper">
                    <h1>create an account</h1>

                    <form>
                        <input name='name' type="text" placeholder='name' onChange={e => handleChange(e)} />
                        <input name='lastname' type="text" placeholder='last name' onChange={e => handleChange(e)} />
                        <input name='username' type="text" placeholder='username' onChange={e => handleChange(e)} />
                        <input name='email' type="email" placeholder='email' onChange={e => handleChange(e)} />
                        <input name='password' type="password" placeholder='password' onChange={e => handleChange(e)} />
                        <input name='confPassword' type="password" placeholder='confirm password' onChange={e => handleChange(e)} />
                    </form>


                    <span>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                    <Link to='/login'>login</Link>
                    { isError && <span className='auth__error'>Could you fill in all the fields correctly, please)</span> }
                    <button onClick={handleCreateUser}>create</button>
                </div>

                <img src={src} alt="..." className={className + ' auth__img'}/>
            </section>

            <div className="auth-logo">
                <Link to='/' className='header__logo' onClick={() => handleReset()}>
                    <h1 >.STORE</h1>
                </Link>
            </div>
        </>
    )
}

export default Register
