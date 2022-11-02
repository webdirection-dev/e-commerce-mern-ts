import React, { FC } from 'react'
import './Cart.scss'
import {useCart} from './useCart'

import CartItem from "./CartItem"
import BreakLine from "../../components/breakLine/BreakLine"
import {Link} from "react-router-dom";

const Cart = () => {
    const {products, totalCart, productsLength, itemsLength} = useCart()

    return(
        <div className='cart'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <div className="wrapper">
                <h1>your bag {products.length < 1 ? 'is empty' : ''}</h1>

                <div className="cart__header">
                    <button>continue shopping</button>

                    <div className="description">
                        <p>shopping bag({productsLength})</p>
                        <Link to='/wishlist'>your wishlist({itemsLength})</Link>
                    </div>

                    <button style={{backgroundColor: 'black', color: 'white'}}>checkout now</button>
                </div>

                <div className="cart__footer">
                    <div className="cart__products">
                        { products && products.map(i => <CartItem key={i._id} {...i}/>) }
                    </div>

                    <div className="summary">
                        <h1>order summary</h1>

                        <div className="details">
                            <h3>subtotal</h3>
                            <span>$ {totalCart}</span>

                            <h3>estimated shipping</h3>
                            <span>$ 5.90</span>

                            <h3>shipping discount</h3>
                            <span>$ -5.90</span>

                            <h3 className='details__total'>total</h3>
                            <span className='details__total'>$ {totalCart + 5.90 - 5.90}</span>
                        </div>

                        <button>checkout now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart