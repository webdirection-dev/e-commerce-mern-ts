import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'

type TAuthState = {
    status: string;
    error: null | string;
    auth: boolean;
}

const initialState: TAuthState = {
    status: 'idle', // loading | received | rejected
    error: null,
    auth: true,
}

export const getAuth = createAsyncThunk<
    boolean,
    string,
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@auth/get-auth',

    async (path, { extra: { client }, rejectWithValue }) => {
        // const user = JSON.parse(localStorage.getItem('user') as string) || null;
        // const token = 'Bearer ' + user.accessToken;

        return await client
            .get(path)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

const authSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        resetState: () => initialState,

        singIn: (state) => {
            return { ...state, auth: true }
        },

        singOut: (state) => {
            return { ...state, auth: false }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAuth.fulfilled, (state, action) => {
                state.status = 'received'
                state.auth = action.payload
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

export const {resetState, singIn, singOut} = authSlice.actions
export const authReducer = authSlice.reducer;

//selectors
export const selectAuthInfo = (state: RootState) => ({
    status: state.authReducer.status,
    error: state.authReducer.error,
    auth: state.authReducer.auth,
});

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}