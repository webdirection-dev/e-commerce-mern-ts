import { combineReducers } from '@reduxjs/toolkit'

import {authReducer} from "./auth/auth-slice"
import {usersReducer} from './users/users-slice'
import {ordersReducer} from "./orders/orders-slice"


import {moviesReducer} from './movies/movies-slice'
import {moviesListReducer} from './lists/movies-list-slice'

export const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    ordersReducer,

    movies: moviesReducer,
    moviesList: moviesListReducer,
})
