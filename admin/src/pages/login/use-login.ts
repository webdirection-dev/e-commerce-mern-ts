import {useAppDispatch, useAppSelector} from "../../hooks/hookRedux";
import {getAuth, selectAuthInfo} from "../../features/auth/auth-slice";
import React, {useState} from "react";

export const useLogin = () => {
    const appDispatch = useAppDispatch()
    const {status} = useAppSelector(store => selectAuthInfo(store))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        appDispatch(getAuth({email, password}))
    }

    return {status, email, setEmail, password, setPassword, handleLogin}
}