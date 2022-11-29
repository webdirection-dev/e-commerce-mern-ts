import React from 'react'
import './single.scss'

import ViewUser from '../../features/users/ViewUser'
import { useGetSingleData } from './use-get-single-data'

const Single: React.FC = () => {
    const { titleCard, dataCard } = useGetSingleData()

    return (
        <div className='single'>
            {titleCard === 'User' && (
                <ViewUser item={dataCard} titleCard={titleCard} />
            )}
        </div>
    );
};

export default Single;
