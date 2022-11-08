import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {axiosInstance} from '../../store'

export const useStripe = (amount) => {
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (stripeToken) {
            const makeRequest = async () => {
                try {
                    const res = await axiosInstance.post(
                        '/checkout/payment',
                        {
                            tokenId: stripeToken.id,
                            amount: amount * 100, //в центах
                        }
                    )

                    navigate('/success', {state: res.data})
                } catch (err) {console.log(err)}
            }

            makeRequest()
        }
    }, [stripeToken, navigate])

    return {stripeToken, setStripeToken}
}