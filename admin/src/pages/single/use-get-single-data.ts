import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hookRedux';
import { selectUserById, getUserById } from '../../features/users/users-slice';
import { IList, IMovie, IUserRows, IUser } from '../../types/types';

interface IPropsToCard {
    props: IMovie | IUserRows | IList | IUser;
}

interface IItemData {
    titleCard: string;
    props: IMovie | IUserRows | IList | IUser;
}

export const useGetSingleData = () => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState({} as IItemData);

    const location = useLocation();
    const id = location.pathname.split('/').reverse()[0];

    const user = useAppSelector((state) => selectUserById(state));

    useEffect(() => {
        if (location.state !== null) {
            const path = location.pathname.split('/')[1];
            const titleCard =
                path[0].toUpperCase() + path.slice(1, path.length - 1);
            const { props } = location.state as IPropsToCard;

            setData({ titleCard, props });
        } else {
            dispatch(getUserById(id));

            setData({
                titleCard: 'User',
                props: user as IUser,
            });
        }
    }, [location, user]);

    return data;
};

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { IList, IMovie, IUserRows } from '../../types/types';

// interface IPropsToCard {
//     props: IMovie | IUserRows | IList;
// }

// interface IItemData {
//     titleCard: string;
//     props: IMovie | IUserRows | IList;
// }

// export const useGetSingleData = () => {
//     const [data, setData] = useState({} as IItemData);

//     const location = useLocation();
//     const { props } = location.state as IPropsToCard;
//     const path = location.pathname.split('/')[1];
//     const titleCard = path[0].toUpperCase() + path.slice(1, path.length - 1);

//     return { titleCard, props };
// };
