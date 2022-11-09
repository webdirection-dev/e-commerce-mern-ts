import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import {RootState, DetailsExtra} from "../../store"

type MovieType = {
    [key: string]: string;
}

type TMoviesState = {
    status: string;
    error: null | string;
    movies: MovieType[];
}

interface IUpdateMovies {
    _id: string;
    items: {}
}

export const loadMovies = createAsyncThunk<MovieType[], string, {extra: DetailsExtra, rejectValue: string}>(
    '@@movies/load-movies',

    async (token, {extra: {client}, rejectWithValue}) => {
        return await client.get(
            '/movies',
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const createMovie = createAsyncThunk<MovieType, {}, {extra: DetailsExtra, rejectValue: string}>(
    '@@movies/create-movie',

    async (item, {extra: {client}, rejectWithValue}) => {
        const user = JSON.parse(localStorage.getItem('user') as string)

        return  await client.post(
            '/movies',
            item,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const updateMovie = createAsyncThunk<MovieType, IUpdateMovies, {extra: DetailsExtra, rejectValue: string}>(
    '@@movies/update-movie',

    async ({_id, items}, {extra: {client}, rejectWithValue}) => {
        const user = JSON.parse(localStorage.getItem('user') as string)

        return  await client.put(
            '/movies/' + _id,
            items,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const removeMovie = createAsyncThunk<string, string, {extra: DetailsExtra, rejectValue: string}>(
    '@@movies/remove-movie',

    async (id, {extra: {client}, rejectWithValue}) => {
        const user = JSON.parse(localStorage.getItem('user') as string)

        return  await client.delete(
            '/movies/' + id,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(() => {
                return id
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

const initialState: TMoviesState = {
    status: 'idle', // loading | received | rejected
    error: null,
    movies: [],
}

const moviesSlice = createSlice({
    name: '@@movies-lists',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(
                loadMovies.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.movies = action.payload
                }
            )

            .addCase(
                createMovie.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.movies = [...state.movies.reverse(), action.payload].reverse()
                }
            )

            .addCase(
                updateMovie.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    const out = state.movies.filter(i => i._id !== action.payload._id).reverse()
                    out.push(action.payload)
                    state.movies = out.reverse()
                }
            )

            .addCase(
                removeMovie.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.movies = state.movies.filter(i => i._id !== action.payload)
                }
            )

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

// export const {setLists, setLoading, setError} = countriesSlice.actions
export const moviesReducer = moviesSlice.reducer

//selectors
export const selectMoviesInfo = (state: RootState) => ({
    status: state.movies.status,
    error: state.movies.error,
    qty: state.movies.movies.length
})

export const selectAllMovies = (state: RootState) => state.movies.movies

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}