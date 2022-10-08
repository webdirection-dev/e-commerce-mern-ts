import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IProductFromMongo} from "../../static/types/productTypes"

type TProductState = {
    status: string;
    error: null | string;
    products: IProductFromMongo[];
}

export const getProducts = createAsyncThunk<
    IProductFromMongo[],
    string,
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@products/get-products',

    async (path, { extra: { client }, rejectWithValue }) => {
        // const user = JSON.parse(localStorage.getItem('user') as string) || null;
        // const token = 'Bearer ' + user.accessToken;

        return await client
            .get(path)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

const initialState: TProductState = {
    status: 'idle', // loading | received | rejected
    error: null,
    products: [],
}

const productSlice = createSlice({
    name: '@@products',
    initialState,
    reducers: {
        resetState: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'received'
                state.products = action.payload
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

export const {resetState} = productSlice.actions
export const productReducer = productSlice.reducer;

//selectors
export const selectProductsInfo = (state: RootState) => ({
    status: state.productReducer.status,
    error: state.productReducer.error,
    qty: state.productReducer.products.length,
});

export const selectAllProduct = (state: RootState) => state.productReducer.products
export const selectProductById = (state: RootState, id: string) => state.productReducer.products.find((i) => i._id === id)

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}