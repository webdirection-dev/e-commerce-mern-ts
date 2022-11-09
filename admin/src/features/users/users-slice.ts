import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import { RootState, DetailsExtra } from '../../store'
import { IUser } from '../../types/types'

type UserType = {[key: string]: string}
type StatsType = {[key: string]: number}

type TUserState = {
    status: string;
    error: null | string;
    users: IUser[];
    user: IUser | {};
    newUsers: UserType[];
    stats: StatsType[];
}

interface IUpdateUser {
    _id: string;
    items: {};
}

export const loadUsers = createAsyncThunk<
    IUser[],
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/load-users',

    async (token, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/users', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const getUserById = createAsyncThunk<
    IUser,
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/get-by-id-users',

    async (id, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user') as string);

        return await client
            .get('/users/find/' + id, {
                headers: {
                    authorization: 'Bearer ' + user.accessToken,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const sortUsersByNew = createAsyncThunk<
    UserType[],
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/sort-users',

    async (token, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/users?new=true', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const loadStats = createAsyncThunk<
    StatsType[],
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/stats-users',

    async (token, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/users/stats', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const createUser = createAsyncThunk<
    IUser,
    {},
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/create-users',

    async (newUser, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user') as string);

        return await client
            .post('/auth/register', newUser, {
                headers: {
                    authorization: 'Bearer ' + user.accessToken,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const updateUser = createAsyncThunk<
    IUser,
    IUpdateUser,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/update-users',

    async ({ _id, items }, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user') as string);

        return await client
            .put('/users/' + _id, items, {
                headers: {
                    authorization: 'Bearer ' + user.accessToken,
                },
            })
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

export const removeUser = createAsyncThunk<
    string,
    string,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@users/remove-users',

    async (id, { extra: { client }, rejectWithValue }) => {
        const user = JSON.parse(localStorage.getItem('user') as string);

        return await client
            .delete('/users/' + id, {
                headers: {
                    authorization: 'Bearer ' + user.accessToken,
                },
            })
            .then(() => {
                return id;
            })
            .catch((err) => {
                return rejectWithValue(err.message);
            });
    }
);

const initialState: TUserState = {
    status: 'idle', // loading | received | rejected
    error: null,
    users: [],
    user: {},
    newUsers: [],
    stats: [],
};

const usersSlice = createSlice({
    name: '@@users',
    initialState,
    reducers: {
        clearUserId: (state) => {
            state.user = {};
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.status = 'received';
                state.users = action.payload;
            })

            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = 'received';
                state.user = action.payload;
            })

            .addCase(sortUsersByNew.fulfilled, (state, action) => {
                state.status = 'received';
                state.newUsers = action.payload;
            })

            .addCase(loadStats.fulfilled, (state, action) => {
                const data = action.payload.sort(
                    (a: StatsType, b: StatsType) => a['_id'] - b['_id']
                );

                state.status = 'received';
                state.stats = data;
            })

            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'received';
                state.users = [
                    ...state.users.reverse(),
                    action.payload,
                ].reverse();
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'received';
                const out = state.users
                    .filter((i) => i._id !== action.payload._id)
                    .reverse();
                out.push(action.payload);
                state.users = out.reverse();
            })

            .addCase(removeUser.fulfilled, (state, action) => {
                state.status = 'received';
                state.users = state.users.filter(
                    (i) => i._id !== action.payload
                );
            })

            .addMatcher(isPending, (state, action: PayloadAction<string>) => {
                state.error = null;
                state.status = 'loading';
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'rejected';
            });
    },
});

export const { clearUserId } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

//selectors
export const selectUsersInfo = (state: RootState) => ({
    status: state.usersReducer.status,
    error: state.usersReducer.error,
    qty: state.usersReducer.users.length,
});
export const selectAllUsers = (state: RootState) => state.usersReducer.users;
export const selectUserById = (state: RootState) => state.usersReducer.user;
export const selectNewUsers = (state: RootState) => state.usersReducer.newUsers;
export const selectStats = (state: RootState) => state.usersReducer.stats;

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('users/rejected');
}
function isPending(action: AnyAction) {
    return action.type.endsWith('users/pending');
}
