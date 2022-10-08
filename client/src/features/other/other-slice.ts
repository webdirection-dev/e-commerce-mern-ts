import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../store'

import {IObjectStrings} from "../../static/types/otherTypes"

type TOtherState = {
    category: undefined | string;
    filter: IObjectStrings;
    sort: string;
}

const initialState: TOtherState = {
    category: undefined,
    filter: {color: 'all', size: 'all'},
    sort: 'newest',
}

const otherSlice = createSlice({
    name: '@@other',
    initialState,
    reducers: {
        resetState: () => initialState,

        getCategory: (state, action) => {
            return ({
                ...state,
                category: action.payload
            })
        },

        setFilters: (state, action) => {
            return ({
                ...state,
                filter: action.payload
            })
        },

        setSorting: (state, action) => {
            return ({
                ...state,
                sort: action.payload
            })
        },
    }
});

export const {resetState, getCategory, setFilters, setSorting} = otherSlice.actions
export const otherReducer = otherSlice.reducer;

//selectors
export const selectOtherInfo = (state: RootState) => ({
    category: state.otherReducer.category,
    filter: state.otherReducer.filter,
    sort: state.otherReducer.sort,
})