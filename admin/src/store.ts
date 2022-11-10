import {configureStore} from "@reduxjs/toolkit"
import {rootReducer} from "./features"

import axios, {AxiosStatic,  AxiosInstance} from 'axios';
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axiosInstance,
            },
        },
    }),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type DetailsExtra = {client: AxiosInstance}