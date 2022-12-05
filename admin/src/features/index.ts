import { combineReducers } from '@reduxjs/toolkit'

import {authReducer} from "./auth/auth-slice"
import {usersReducer} from './users/users-slice'
import {ordersReducer} from "./orders/orders-slice"
import {productsReducer} from "./products/products-slice"
import {cartReducer} from "./cart/cart-slice"

export const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    ordersReducer,
    productsReducer,
    cartReducer,
})
