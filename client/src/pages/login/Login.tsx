import React, { FC } from 'react'
import './Login.scss'
import {useLogin} from './useLogin'

interface ILoginProps {}

const Login: FC<ILoginProps> = () => {
    const {} = useLogin()

    return(
        <div className='login'>
            Login Component
        </div>
    )
}

export default Login