import React, { FC } from 'react'
import './Cart.scss'
import {useCart} from './useCart'

import BreakLine from "../../components/breakLine/BreakLine"
import { MdAdd, MdRemove } from "react-icons/md"

interface ICartProps {}

const Cart: FC<ICartProps> = () => {
    const {} = useCart()

    return(
        <div className='cart'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <div className="wrapper">
                <h1>your bag</h1>

                <div className="cart__header">
                    <button>continue shopping</button>

                    <div className="description">
                        <p>shopping bag(2)</p>
                        <p>your wishlist(0)</p>
                    </div>

                    <button style={{backgroundColor: 'black', color: 'white'}}>checkout now</button>
                </div>

                <div className="cart__footer">
                    <div className="products">
                        <div className="product">
                            <img src="https://is4.fwrdassets.com/images/p/fw/z/HLSA-WS27_V1.jpg" alt="..."/>

                            <ul>
                                <li><b>product:</b> denim overshirt</li>
                                <li><b>id:</b> 93813718293</li>
                                <li className='wrapper-product-color'>
                                    <b>color:</b>
                                    <div className='product-details-color' style={{backgroundColor: '#f1e0c8'}}></div>
                                </li>
                                <li><b>size:</b> 37.5</li>
                            </ul>

                            <div className="price">
                                <div className="amount">
                                    <MdRemove />
                                    <span>2</span>
                                    <MdAdd />
                                </div>

                                <span>$ 30</span>
                            </div>
                        </div>

                        <div className="product">
                            <img src="https://cdn.shopify.com/s/files/1/2185/2813/products/W7112R_0101_1_bbffc526-2fca-4185-bd44-fa4f9d594ba7_750x.jpg?v=1619474670" alt="..."/>

                            <ul>
                                <li><b>product:</b> OFF-DUTY CAP</li>
                                <li><b>id:</b> 77813718277</li>
                                <li className='wrapper-product-color'>
                                    <b>color:</b>
                                    <div className='product-details-color' style={{backgroundColor: 'black'}}></div>
                                </li>
                                <li><b>size:</b> M</li>
                            </ul>

                            <div className="price">
                                <div className="amount">
                                    <MdRemove />
                                    <span>2</span>
                                    <MdAdd />
                                </div>

                                <span>$ 10</span>
                            </div>
                        </div>
                    </div>

                    <div className="summary">
                        <h1>order summary</h1>

                        <div className="details">
                            <h3>subtotal</h3>
                            <span>$ 80</span>

                            <h3>estimated shipping</h3>
                            <span>$ 5.90</span>

                            <h3>shipping discount</h3>
                            <span>$ -5.90</span>

                            <h3 className='details__total'>total</h3>
                            <span className='details__total'>$ 80</span>
                        </div>

                        <button>checkout now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart