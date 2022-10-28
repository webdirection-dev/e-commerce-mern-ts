import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IProductFromMongo} from "../../static/types/productTypes"

type TCartState = {
    status: string;
    error: null | string;
    products: [];
    quantity: number;
    total: number;
}

const initialState: TCartState = {
    status: 'idle', // loading | received | rejected
    error: null,
    products: [],
    quantity: 0,
    total: 0,
}

export const postCart = createAsyncThunk<
    IProductFromMongo[],
    string,
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@cart/post-cart',

    async (path, { extra: { client }, rejectWithValue }) => {
        // const user = JSON.parse(localStorage.getItem('user') as string) || null;
        // const token = 'Bearer ' + user.accessToken;

        return await client
            .post(path)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

const cartSlice = createSlice({
    name: '@@cart',
    initialState,
    reducers: {
        resetState: () => initialState,

        addProductsToCart: (state, action) => {
            return {
                ...state,
                quantity: state.quantity + 1,
                products: action.payload.products,
                total: state.total + action.payload.price
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(postCart.fulfilled, (state, action) => {
                state.status = 'received'
                // state.products = action.payload
            })

            .addMatcher(isPending, (state, action: PayloadAction<string>) => {
                state.error = null
                state.status = 'loading'
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            });
    },
});

export const {resetState, addProductsToCart} = cartSlice.actions
export const cartReducer = cartSlice.reducer;

//selectors
export const selectCartInfo = (state: RootState) => ({
    status: state.cartReducer.status,
    error: state.cartReducer.error,
    quantity: state.cartReducer.quantity,
    total: state.cartReducer.total,
});

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}