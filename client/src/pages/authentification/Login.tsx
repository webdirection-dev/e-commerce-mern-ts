import {Link} from "react-router-dom"
import './Auth.scss'
import {preloader} from "../../static/img"
import {useLogin} from "./hooks/useLogin"
import React from "react";

const Login = () => {
    const {status, error, setEmail, setPassword, handleClick, handleReset, src, className} = useLogin()

    return(
        <>
            <section className='auth'>
                <div className="wrapper login-wrapper">
                    <h1>sign in</h1>

                    <form className='login-form'>
                        <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)}/>
                    </form>

                    {status === 'loading'
                        ? <img className={'auth__preloader'} src={preloader} alt="preloader"/>
                        : <button className='login-btn' onClick={() => handleClick()} disabled={status === 'loading'}>login</button>
                    }

                    { error && <span className='auth__error'>{error}</span> }

                    <a href="#">do not you remember the password?</a>
                    <Link to='/register'>create a new account</Link>
                </div>

                <img id='auth__img' src={src} alt="..." className={className + ' login-bg'}/>
            </section>

            <div className="auth-logo">
                <Link to='/' className='header__logo' onClick={() => handleReset()}>
                    <h1 >.STORE</h1>
                </Link>
            </div>
        </>
    )
}

export default Login