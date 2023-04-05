import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import { IProductFromMongo } from "../../static/types/mongoTypes"
import { log } from 'console'

type TProductState = {
    status: string
    error: null | string
    products: IProductFromMongo[]
    singleProduct: IProductFromMongo
    productForPopup: IProductFromMongo
    random: string
}

const initialState: TProductState = {
    status: 'idle', // loading | received | rejected
    error: null,
    products: [],
    singleProduct: {} as IProductFromMongo,
    productForPopup: {} as IProductFromMongo,
    random: '8',
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
            .then(({ data }) => {
                return data
            })
            .catch((err) => {
                console.log(err)

                return rejectWithValue(err.message)
            })
    }
)

export const getSingleProduct = createAsyncThunk<
    IProductFromMongo,
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@products/get-single-product',

    async (id, { extra: { client }, rejectWithValue }) => {
        // const user = JSON.parse(localStorage.getItem('user') as string) || null;
        // const token = 'Bearer ' + user.accessToken;

        return await client
            .get('/products/find/' + id)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

const productSlice = createSlice({
    name: '@@products',
    initialState,
    reducers: {
        resetState: () => initialState,

        resetProductForPopup: (state) => {
            return {
                ...state,
                productForPopup: {}
            }
        },

        setProductForPopup: (state, action) => {
            return {
                ...state,
                productForPopup: action.payload
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'received'
                state.products = action.payload
            })

            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.status = 'received'
                state.singleProduct = action.payload
            })

            .addMatcher(isPending, (state, action: PayloadAction<string>) => {
                state.error = null
                state.status = 'loading'
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    },
})

export const { resetState, setProductForPopup, resetProductForPopup } = productSlice.actions
export const productReducer = productSlice.reducer

//selectors
export const selectProductsInfo = (state: RootState) => ({
    status: state.productReducer.status,
    error: state.productReducer.error,
    random: state.productReducer.random,
    qty: state.productReducer.products.length,
})

export const selectAllProduct = (state: RootState) => state.productReducer.products
export const selectProductById = (state: RootState, id: string) => state.productReducer.products.find((i) => i._id === id)
export const selectSingleProduct = (state: RootState) => state.productReducer.singleProduct
export const selectProductForPopup = (state: RootState) => state.productReducer.productForPopup

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}