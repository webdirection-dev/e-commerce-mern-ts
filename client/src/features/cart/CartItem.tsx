import React, {FC} from "react"
import {MdAdd, MdRemove, MdDeleteOutline} from "react-icons/md"

import {useAppDispatch} from "../../store"
import {managerQuantityThisItem, removeProductFromCart} from "./cart-slice"

import {IObjectStrings} from "../../static/types/otherTypes"
import {Link} from "react-router-dom";

const CartItem: FC<IObjectStrings> = ({_id, localId, img, title, color, size, quantityThisProduct, price}) => {
    const dispatch = useAppDispatch()

    return(
        <div key={_id} className="cart__product">
            <Link to={'/product/'+_id}>
                <img src={img} alt={title}/>
            </Link>

            <ul>
                <li><b>product:</b> {title}</li>
                <li><b>price:</b> ${price}</li>
                <li><b>size:</b> {size}</li>
                <li className='wrapper-product-color'>
                    <b>color:</b>
                    <div className='product-details-color' style={{backgroundColor: `${color}`}}></div>
                </li>
                <li><b>id:</b> {_id}</li>
            </ul>

            <div className="price">
                <div className="amount">
                    <MdRemove onClick={ () => dispatch(managerQuantityThisItem({localId, act: 'dec'})) }/>
                    <span>{quantityThisProduct}</span>
                    <MdAdd onClick={ () => dispatch(managerQuantityThisItem({localId, act: 'inc'})) }/>
                </div>

                <span>$ {+price * +quantityThisProduct}</span>
            </div>

            <div className='cart__remove' onClick={() => dispatch(removeProductFromCart(localId))}>
                <MdDeleteOutline />
            </div>
        </div>
    )
}

export default CartItem