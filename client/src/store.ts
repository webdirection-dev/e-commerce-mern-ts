import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

import {productReducer} from "./features/products/product-slice"
import {cartReducer} from "./features/cart/cart-slice"

import axios, {AxiosStatic,  AxiosInstance} from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const rootReducer = combineReducers({
    // auth: authReducer,
    productReducer,
    cartReducer,
});

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    client: axiosInstance,
                },
            },
        }),

    devTools: true,
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type DetailsExtra = { client: AxiosInstance };