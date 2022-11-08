import {useState} from "react"
import {useNavigate} from "react-router-dom"

import {useAppDispatch, useAppSelector} from "../../../store"
import {getAuth, singOut, selectAuthInfo} from "../../../features/auth/auth-slice"

import {useBgSmaller} from "../../../static/hooks/useBgSmaller"
import {bgLogin} from "../../../static/img"

export const useLogin = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {status, error} = useAppSelector(store => selectAuthInfo(store))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {src, className} = useBgSmaller(bgLogin)

    const handleClick = async () => {
        if (email.length > 0 && password.length > 0) {
            await dispatch(getAuth({email, password}))

            setTimeout(() => {
                if (error) navigate('/')
            }, 3000)
        }
    }

    const handleReset = () => {
        dispatch(singOut())
    }

    return {status, error, setEmail, setPassword, handleClick, handleReset, src, className}
}