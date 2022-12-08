import {useEffect} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import {useAppDispatch} from "../../store"
import {resetCart} from "../../features/cart/cart-slice"

const Success = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state)

    useEffect(() => {
        dispatch(resetCart())
        navigate('/')
    }, [])

    return(
        <div
            style={{
                padding: '15px',
                backgroundColor: 'teal',
                color: 'white',
                margin: '5% auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '500px',
                height: '500px',
            }}
        >SUCCESSFULLY</div>
    )
}

export default Success
