import {useAppDispatch, useAppSelector} from "../../static/hooks/hookRedux"

import {defaultAvatar, storage} from "../../static/configs/firebase"
import {deleteObject, ref} from "firebase/storage"

import {selectUsersInfo, removeUser} from "../../features/users/users-slice"
import {selectAllMovies, removeMovie} from "../../features/movies/movies-slice"

import {selectAllMoviesLists, removeMoviesList} from "../../features/lists/movies-list-slice"
import {userColumns, moviesColumns, listsColumns} from "../../static/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    const dispatch = useAppDispatch()
    const {allUsers} = useAppSelector(state => selectUsersInfo(state))
    const movies = useAppSelector(state => selectAllMovies(state))
    const lists = useAppSelector(state => selectAllMoviesLists(state))

    const columns =
        type === 'user' ? userColumns :
        type === 'movie' ? moviesColumns :
        type === 'list' ? listsColumns : []

    const rows =
        type === 'user' ? allUsers :
        type === 'movie' ? movies :
        type === 'list' ? lists : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = async (id: string) => {
        if (type === 'user') {
            dispatch(removeUser(id))

            const user = allUsers.find(i => i._id === id)
            if (user) await deleteAvatarFromFirebase(user.profilePic)
        }

        if (type === 'movie') {
            dispatch(removeMovie(id))

            const movie = movies.find(i => i._id === id)
            if (movie) await deleteAvatarFromFirebase(movie.img)
            if (movie) await deleteAvatarFromFirebase(movie.imgSm)
            if (movie) await deleteAvatarFromFirebase(movie.imgTitle)
            if (movie) await deleteAvatarFromFirebase(movie.trailer)
            if (movie) await deleteAvatarFromFirebase(movie.video)
        }

        if (type === 'list') dispatch(removeMoviesList(id))

    }

    return {columns, rows, title, deleteItem}
}

async function deleteAvatarFromFirebase (urlImg: string) {
    if (urlImg !== defaultAvatar) {
        const desertRef = ref(storage, urlImg);
        await deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
                console.error(error)
            });
    } else return
}