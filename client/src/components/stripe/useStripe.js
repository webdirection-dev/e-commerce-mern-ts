import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import {axiosInstance, useAppSelector} from '../../store'
import {selectAuthInfo} from '../../features/auth/auth-slice'
import {selectCartInfo} from '../../features/cart/cart-slice'

export const useStripe = (amount) => {
    const navigate = useNavigate()
    const [stripeToken, setStripeToken] = useState(null)
    const {currentUser} = useAppSelector(store => selectAuthInfo(store))
    const {products} = useAppSelector(store => selectCartInfo(store))

    useEffect(() => {
        if (stripeToken) {
            const createOrder = async ({amount, billing_details, status}) => {
                const newOrder = {
                    userId: currentUser._id,
                    products: products.map(i => ({productId: i._id, quantity: i.quantityThisProduct})),
                    amount: amount/100,
                    address: billing_details.address,
                    status
                }

                try {
                    await axiosInstance.post('/orders', newOrder, {headers: {authorization: 'Bearer ' + currentUser.accessToken}})
                    navigate('/success', {state: newOrder})
                }
                catch (err) {console.log(err)}
            }

            const makeRequest = async () => {
                try {
                    const res = await axiosInstance.post(
                        '/checkout/payment',
                        {
                            tokenId: stripeToken.id,
                            amount: amount * 100, //в центах
                        }
                    )

                    await createOrder(res.data)
                } catch (err) {console.log(err)}
            }

            makeRequest()
        }
    }, [stripeToken, navigate])

    return {stripeToken, setStripeToken}
}
