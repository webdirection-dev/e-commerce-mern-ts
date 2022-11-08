import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {authReducer} from "./features/auth/auth-slice"
import {productReducer} from "./features/products/product-slice"
import {cartReducer} from "./features/cart/cart-slice"
import {wishlistReducer} from "./features/wishlist/wishlist-slice"

import axios, {AxiosStatic,  AxiosInstance} from 'axios'
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const rootReducer = combineReducers({
    authReducer,
    productReducer,
    cartReducer,
    wishlistReducer,
});

const persistConfig = {key: 'root', version: 1, storage, blacklist: ['productReducer']}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    client: axiosInstance,
                },
            },

            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

    devTools: true,
});

export const persistor = persistStore(store)

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type DetailsExtra = { client: AxiosInstance };