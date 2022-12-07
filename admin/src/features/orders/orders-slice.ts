import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import { IOrder } from '../../static/types/typesMongo'
import {TStats} from "../../static/types/typeAnother"

type TOrdersState = {
    status: string;
    error: null | string;
    orders: IOrder[];
    order: IOrder | {};
    income: TStats[];


}

const initialState: TOrdersState = {
    status: 'idle', // loading | received | rejected
    error: null,
    orders: [],
    order: {},
    income: [],
}

export const loadOrders = createAsyncThunk<
    IOrder[],
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@orders/load-orders',

    async (token, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/orders', {headers: {authorization: 'Bearer ' + token}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const getOrderById = createAsyncThunk<
    IOrder,
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@orders/get-order',

    async (id, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/orders/order/'+id)
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const getIncome = createAsyncThunk<
    TStats[],
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@orders/income',

    async (token, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string)
        const tokenOut = token === '' ? user.accessToken : token

        return await client
            .get('/orders/income', {headers: {authorization: 'Bearer ' + tokenOut}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

const ordersSlice = createSlice({
    name: '@@orders',
    initialState,
    reducers: {
        clearOrderId: (state) => {
            state.order = {};
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.status = 'received'
                state.orders = action.payload
            })

            .addCase(getOrderById.fulfilled, (state, action) => {
                state.status = 'received'
                state.order = action.payload
            })

            .addCase(getIncome.fulfilled, (state, action) => {
                const data = action.payload.sort(
                    (a: TStats, b: TStats) => a['_id'] - b['_id']
                )

                state.status = 'received'
                state.income = data
            })

            .addMatcher(isPending, (state) => {
                state.error = null
                state.status = 'loading'
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    },
})

export const { clearOrderId } = ordersSlice.actions
export const ordersReducer = ordersSlice.reducer

//selectors
export const selectOrdersInfo = (state: RootState) => ({
    status: state.ordersReducer.status,
    error: state.ordersReducer.error,
    qty: state.ordersReducer.orders.length,
    orders: state.ordersReducer.orders,
    orderById: state.ordersReducer.order,
    income: state.ordersReducer.income
})

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@orders')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@orders')
}
