import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {IProductFromMongo} from "../../static/types/productTypes"

type TWishlistState = {
    items: IProductFromMongo[];
}

const initialState: TWishlistState = {
    items: [],
}

const wishlistSlice = createSlice({
    name: '@@wishlist',
    initialState,
    reducers: {
        resetState: () => initialState,

        addToWishlist: (state, action) => {
            return { items: [...state.items, action.payload] }
        },

        removeFromWishlist: (state, action) => {
            return { items: state.items.filter(i => i._id !== action.payload) }
        }
    }
})

export const {resetState, addToWishlist, removeFromWishlist} = wishlistSlice.actions
export const wishlistReducer = wishlistSlice.reducer;

//selectors
export const selectWishlistInfo = (state: RootState) => ({
    items: state.wishlistReducer.items,
    itemsLength: state.wishlistReducer.items.length,
})