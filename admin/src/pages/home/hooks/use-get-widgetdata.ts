import { useAppSelector } from '../../../static/hooks/hookRedux';
import { selectUsersInfo } from '../../../features/users/users-slice';
import { selectAllMovies } from '../../../features/movies/movies-slice';
import { selectAllMoviesLists } from '../../../features/lists/movies-list-slice';

export const useGetWidgetdata = () => {
    const {allUsers} = useAppSelector((state) => selectUsersInfo(state));
    const movies = useAppSelector((state) => selectAllMovies(state));
    const lists = useAppSelector((state) => selectAllMoviesLists(state));

    return { allUsers, movies, lists };
};
