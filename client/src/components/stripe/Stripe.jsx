import StripeCheckout from "react-stripe-checkout"
import {useStripe} from './useStripe'

const Stripe = ({amount}) => {
    const {stripeToken, setStripeToken} = useStripe(amount)

    return(
        <StripeCheckout
            name='Shop Inc.'
            image='https://www.designevo.com/res/templates/thumb_small/shape-and-letter-s.webp?v=1.0.0.2'
            billingAddress
            shippingAddress
            description={'Your Total is $'+amount}
            amount={amount * 100} //в центах
            token={token => setStripeToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        >
            {
                stripeToken ?
                    <span>Processing. Please wait...</span> :
                    <button
                        style={{
                            padding: '15px',
                            backgroundColor: 'black',
                            color: 'white',
                            margin: '25% auto',
                            display: 'block',
                            width: '300px'
                        }}>checkout now</button>
            }
        </StripeCheckout>
    )
}

export default Stripe