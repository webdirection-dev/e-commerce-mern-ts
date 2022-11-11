import React from 'react';
import './single.scss';

import ViewUser from '../../features/users/ViewUser';
import ViewMovie from '../../features/movies/ViewMovie';
import ViewList from '../../features/lists/ViewList';

import { useGetSingleData } from './use-get-single-data';
import { IUserRows, IMovie, IList } from '../../static/types/types';

const Single: React.FC = () => {
    const { titleCard, dataCard } = useGetSingleData()

    return (
        <div className='single'>
            {titleCard === 'User' && (
                <ViewUser item={dataCard as IUserRows} titleCard={titleCard} />
            )}

            {titleCard === 'Movie' && (
                <ViewMovie item={dataCard as IMovie} titleCard={titleCard} />
            )}

            {titleCard === 'List' && (
                <ViewList item={dataCard as IList} titleCard={titleCard} />
            )}
        </div>
    );
};

export default Single;
