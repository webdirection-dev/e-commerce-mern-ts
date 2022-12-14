import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IProductFromMongo} from "../../static/types/mongoTypes"

interface TProductToCart extends IProductFromMongo{
    quantityThisProduct: number;
    localId: number;
}

type TCartState = {
    status: string;
    error: null | string;
    products: TProductToCart[];
    quantityAllItems: number;
}

const initialState: TCartState = {
    status: 'idle', // loading | received | rejected
    error: null,
    products: [],
    quantityAllItems: 0
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
        resetCart: () => initialState,

        addProductsToCart: (state, action) => {
            const out = {
                ...action.payload,
                localId: action.payload._id + Math.random()
            }
            return {
                ...state,
                quantityAllItems: state.quantityAllItems + 1,
                products: [...state.products, out],
            }
        },

        removeProductFromCart: (state, action) => {
            return {
                ...state,
                quantityAllItems: state.quantityAllItems - 1,
                products: state.products.filter(i => i.localId !== action.payload)
            }
        },

        managerQuantityThisItem: (state, action) => {
            const {localId, act} = action.payload

            const out = state.products.map(i => {
                if (i.localId === localId) {
                    if (act === 'dec' && i.quantityThisProduct > 0) {
                        return (
                            {
                                ...i,
                                quantityThisProduct: i.quantityThisProduct - 1
                            }
                        )
                    }
                    if (act === 'inc') {
                        return (
                            {
                                ...i,
                                quantityThisProduct: i.quantityThisProduct + 1
                            }
                        )
                    }
                }
                return i
            })

            return {
                ...state,
                products: out,
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

export const {resetCart, addProductsToCart, removeProductFromCart, managerQuantityThisItem} = cartSlice.actions
export const cartReducer = cartSlice.reducer;

//selectors
export const selectCartInfo = (state: RootState) => ({
    status: state.cartReducer.status,
    error: state.cartReducer.error,
    products: state.cartReducer.products,
    productsLength: state.cartReducer.products.length,
    quantityAllItems: state.cartReducer.quantityAllItems,
});

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}
