import React, {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../hooks/hookRedux"
import {getAuth, selectAuthInfo} from "../../features/auth/auth-slice"

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {status} = useAppSelector(store => selectAuthInfo(store))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(getAuth({email, password}))
    }

    return(
        <form className="loginForm">
            <label htmlFor="loginPanel">Users name or Email</label>
            <input
                id='loginPanel'
                className='loginInput'
                type="text"
                placeholder='name or email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="passwordPanel">Password</label>
            <input
                id='passwordPanel'
                className='loginInput'
                type="password"
                placeholder='your password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button
                className="loginBtn"
                onClick={e => handleLogin(e)}
                disabled={status === 'loading'}
            >Sing in</button>
        </form>
    )
}

export default LoginForm