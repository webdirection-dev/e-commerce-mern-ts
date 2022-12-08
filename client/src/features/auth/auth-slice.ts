import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import {IUserFromMongo} from "../../static/types/mongoTypes"

type TAuthState = {
    status: string;
    error: null | string;
    currentUser: IUserFromMongo;
}

const initialState: TAuthState = {
    status: 'idle', // loading | received | rejected
    error: null,
    currentUser: {} as IUserFromMongo,
}

export const getAuth = createAsyncThunk<
    IUserFromMongo,
    {email: string, password: string},
    { extra: DetailsExtra; rejectValue: string }
    >(
    '@@auth/get-auth',

    async (credentials, { extra: { client }, rejectWithValue }) => {
        // const user = JSON.parse(localStorage.getItem('user') as string) || null;
        // const token = 'Bearer ' + user.accessToken;

        return await client
            .post('/auth/login', credentials)
            .then(({ data }) => data)
            .catch((err) => rejectWithValue(err.message))
    }
)

export const createUser = createAsyncThunk<
    IUserFromMongo,
    {},
    { extra: DetailsExtra, rejectValue: string }
>(
    '@@auth/create-user',

    async (newUser, { extra: { client }, rejectWithValue }) => {
        return await client
            .post('/auth/register', newUser)
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

const userSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers: {
        singOut: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAuth.fulfilled, (state, action) => {
                state.status = 'received'
                state.currentUser = action.payload
            })

            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'received'
                state.currentUser = action.payload
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

export const {singOut} = userSlice.actions
export const authReducer = userSlice.reducer;

//selectors
export const selectAuthInfo = (state: RootState) => ({
    status: state.authReducer.status,
    error: state.authReducer.error,
    currentUser: state.authReducer.currentUser,
    auth: !!state.authReducer.currentUser.email,
});

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@auth')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@auth')
}
