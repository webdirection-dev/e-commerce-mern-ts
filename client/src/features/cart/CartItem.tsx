import React, {FC} from "react"
import {MdAdd, MdRemove} from "react-icons/md"

import {useAppDispatch} from "../../store"
import {managerQuantityThisItem} from "./cart-slice"

import {IObjectStrings} from "../../static/types/otherTypes"

const CartItem: FC<IObjectStrings> = ({_id, img, title, color, size, quantityThisProduct, price}) => {
    const dispatch = useAppDispatch()

    return(
        <div key={_id} className="cart__product">
            <img src={img} alt={title}/>

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
                    <MdRemove onClick={ () => dispatch(managerQuantityThisItem({_id, act: 'dec'})) }/>
                    <span>{quantityThisProduct}</span>
                    <MdAdd onClick={ () => dispatch(managerQuantityThisItem({_id, act: 'inc'})) }/>
                </div>

                <span>$ {+price * +quantityThisProduct}</span>
            </div>
        </div>
    )
}

export default CartItem