import {ChangeEvent, useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../../store"
import {createUser} from "../../../features/auth/auth-slice"

export const useRegister = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [newUser, setNewUser] = useState({} as {[key: string]: string})
    const [isError, setIsError] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {name, value} = e.target
        setNewUser({...newUser, [name]: value})
    }

    const handleCreateUser = () => {
        if (isReady) {
            setIsError(false)
            setNewUser({})
            dispatch(createUser(newUser))
            navigate('./')
        } else setIsError(true)
    }

    useEffect(() => {
        if (
            (newUser.username && newUser.username !== '') &&
            (newUser.email && newUser.email !== '') &&
            (newUser.password && newUser.password !== '')
        ) {
            setIsError(false)
            setIsReady(true)
        }
        else setIsReady(false)
    }, [newUser])

    return {handleChange, handleCreateUser, isError}
}
