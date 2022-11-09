import { useAppSelector } from '../../../hooks/hookRedux';
import { selectAllUsers } from '../../../features/users/users-slice';
import { selectAllMovies } from '../../../features/movies/movies-slice';
import { selectAllMoviesLists } from '../../../features/lists/movies-list-slice';

export const useGetWidgetdata = () => {
    const users = useAppSelector((state) => selectAllUsers(state));
    const movies = useAppSelector((state) => selectAllMovies(state));
    const lists = useAppSelector((state) => selectAllMoviesLists(state));

    return { users, movies, lists };
};
