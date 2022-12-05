import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import { ICart } from '../../static/types/typesMongo'

type TCartState = {
    status: string;
    error: null | string;
    cart: ICart | {}


}

const initialState: TCartState = {
    status: 'idle', // loading | received | rejected
    error: null,
    cart: {},
}

export const getCart = createAsyncThunk<
    ICart,
    undefined,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@cart/load-cart',

    async (_, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string)

        return await client
            .get('/cart', {headers: {authorization: 'Bearer ' + user.accessToken}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

const cartSlice = createSlice({
    name: '@@cart',
    initialState,
    reducers: {
        clearCartId: (state) => {
            state.cart = {};
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'received'
                state.cart = action.payload
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

export const { clearCartId } = cartSlice.actions
export const cartReducer = cartSlice.reducer

//selectors
export const selectCartInfo = (state: RootState) => ({
    status: state.cartReducer.status,
    error: state.cartReducer.error,
    cart: state.cartReducer.cart
})

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@cart')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@cart')
}
