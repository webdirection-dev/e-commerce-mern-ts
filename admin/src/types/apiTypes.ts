import {Dispatch} from "react"
import {IUser, IMovie, IList} from "./types"

//auth
export interface IAuthUserAction {
    type: string;
    payload?: {};
}

export type TAuthDispatch = Dispatch<IAuthUserAction> | undefined

export interface IAuthUserState {
    user: null | IUser;
    isFetching: boolean;
    error: boolean;
    dispatch?: TAuthDispatch;
}

//movies
export interface IMovieAction {
    type: string;
    payload?: {};
}

export type TMovieDispatch = Dispatch<IMovieAction> | undefined

export interface IMovieState {
    movies: IMovie[];
    isFetching: boolean;
    error: boolean;
    dispatch?: TMovieDispatch;
}

//list
export interface IListAction {
    type: string;
    payload?: {};
}

export type TListDispatch = Dispatch<IListAction> | undefined

export interface IListState {
    lists: IList[];
    isFetching: boolean;
    error: boolean;
    dispatch?: TListDispatch;
}
