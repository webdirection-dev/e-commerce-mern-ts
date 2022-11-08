import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {IProductFromMongo} from "../../static/types/mongoTypes"

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
            const isUnique = state.items.find(i => i._id === action.payload._id)
            if (!isUnique || state.items.length === 0) return { items: [...state.items, action.payload] }
            else return { items: state.items.filter(i => i._id !== action.payload._id) }
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

export const selectFindById = (state: RootState, id: string) => ({
    isUnique: state.wishlistReducer.items.find(i => i._id === id)
})