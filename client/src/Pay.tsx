import React, {useEffect, useState} from 'react'
import StripeCheckout, {Token} from 'react-stripe-checkout'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const STRIPE_PUBLIC_KEY = 'pk_test_51Lo4zzDDzYjnKe8qNBUpNPxh6Npq1PLDFx6F9gTdDBWKhWQ7uip47rb23065Vp054aQJZRfyx09UBCJKqsHjPahB00PinSa7uU'

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null as null | Token)
    const navigate = useNavigate()

    const onToken = (token: Token) => {
        setStripeToken(token)
    }

    const handlerClick = () => {
        // navigate('/success')
    }

    useEffect(() => {
        if (stripeToken) {
            const makeRequest = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:8800/api/checkout/payment',
                        {
                            tokenId: stripeToken.id,
                            amount: 2000,
                        }
                    )

                    navigate('/success')
                    console.log(res.data)
                } catch (err) {console.log(err)}
            }

            makeRequest()
        }
    }, [stripeToken, navigate])

    return(
        <StripeCheckout
            name='Shop Inc.'
            image='https://www.designevo.com/res/templates/thumb_small/shape-and-letter-s.webp?v=1.0.0.2'
            billingAddress
            shippingAddress
            description='Your Total is $20'
            amount={2000} //в центах
            token={(token: Token) => onToken(token)}
            stripeKey={STRIPE_PUBLIC_KEY}
        >
            {
                stripeToken ?
                    <span>Processing. Please wait...</span> :
                    <button
                        onClick={() => handlerClick()}
                        style={{
                            padding: '15px',
                            backgroundColor: 'black',
                            color: 'white',
                            margin: '25% auto',
                            display: 'block',
                            width: '300px'
                        }}
                    >PAY</button>
            }
        </StripeCheckout>
    )
}

export default Pay