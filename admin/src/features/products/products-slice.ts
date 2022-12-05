import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IProduct} from '../../static/types/typesMongo'
import {TStats} from "../../static/types/typeAnother"
import {log} from "util";

type TProductsState = {
    status: string;
    error: null | string;
    products: IProduct[];
    product: IProduct | {};
    stats: TStats[];
}

const initialState: TProductsState = {
    status: 'idle', // loading | received | rejected
    error: null,
    products: [],
    product: {},
    stats: [],
}

export const getProducts = createAsyncThunk<
    IProduct[],
    undefined,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@products/get-products',

    async (_, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/products')
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const getProductById = createAsyncThunk<
    IProduct,
    string,
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@products/get-product-by-id',

    async (id, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/products/find/' + id)
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const createProduct = createAsyncThunk<
    IProduct,
    {},
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@products/create-product',

    async (newProduct, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string)

        return await client
            .post('/products', newProduct, {headers: {authorization: 'Bearer ' + user.accessToken}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const updateProduct = createAsyncThunk<
    IProduct,
    any,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@products/update-product',

    async ({ _id, items }, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('currentUser') as string);

        return await client
            .put('/products/' + _id, items, {headers: {authorization: 'Bearer ' + user.accessToken}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

export const removeProduct = createAsyncThunk<
    string,
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@products/remove-product',

    //заглушка
    () => {
        console.log('product has ben deleted')
        return ''
    }

    // рабочий метод удаления продукта
    // async (id, { extra: { client }, rejectWithValue }) => {
    //     const user = JSON.parse(localStorage.getItem('currentUser') as string);
    //
    //     return await client
    //         .delete('/products/' + id, {headers: {authorization: 'Bearer ' + user.accessToken}})
    //         .then(() => id)
    //         .catch((err) => {return rejectWithValue(err.message)})
    // }
)

const productsSlice = createSlice({
    name: '@@products',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'received'
                state.products = action.payload
            })

            .addCase(getProductById.fulfilled, (state, action) => {
                state.status = 'received'
                state.product = action.payload
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'received'
                state.products = [
                    ...state.products.reverse(),
                    action.payload,
                ].reverse()
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'received'
                const out = state.products
                    .filter((i) => i._id !== action.payload._id)
                    .reverse()
                out.push(action.payload)
                state.products = out.reverse()
            })

            .addCase(removeProduct.fulfilled, (state, action) => {
                state.status = 'received'
                state.products = state.products.filter((i) => i._id !== action.payload)
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

export const {} = productsSlice.actions
export const productsReducer = productsSlice.reducer

//selectors
export const selectProductInfo = (state: RootState) => ({
    status: state.productsReducer.status,
    error: state.productsReducer.error,
    qty: state.productsReducer.products.length,
    products: state.productsReducer.products,
    productById: state.productsReducer.product
})

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@products')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@products')
}
