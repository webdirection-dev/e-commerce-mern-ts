import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IUser} from "../../static/types/typesMongo"

type TAuthState = {
    status: string;
    error: null | string;
    currentUser: IUser | null;
}

const initialState: TAuthState = {
    status: 'idle', // loading | received | rejected
    error: null,
    currentUser: JSON.parse(localStorage.getItem('currentUser') as string) || null as IUser | null,
}

export const getAuth = createAsyncThunk<
    IUser,
    {email: string, password: string},
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@auth/get-auth',

    async (credentials, { extra: { client }, rejectWithValue }) => {
        return await client
            .post('/auth/login', credentials)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

const userSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        singOut: () => {
            localStorage.removeItem('currentUser')
            return initialState
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAuth.fulfilled, (state, action) => {
                state.status = 'received'
                state.currentUser = action.payload
                localStorage.setItem('currentUser', JSON.stringify(action.payload))
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

export const {singOut} = userSlice.actions
export const authReducer = userSlice.reducer;

//selectors
export const selectAuthInfo = (state: RootState) => ({
    status: state.authReducer.status,
    error: state.authReducer.error,
    currentUser: state.authReducer.currentUser && state.authReducer.currentUser,
    auth: state.authReducer.currentUser && !!state.authReducer.currentUser.email,
})

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@auth')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@auth')
}
