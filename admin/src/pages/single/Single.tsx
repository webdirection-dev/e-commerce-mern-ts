import './single.scss'

import ViewUser from '../../features/users/ViewUser'
import ViewProduct from "../../features/products/ViewProduct"
import { useGetSingleData } from './use-get-single-data'

import {IUser, IProduct} from "../../static/types/typesMongo"

const Single = () => {
    const { titleCard, dataCard } = useGetSingleData()

    return (
        <div className='single'>
            {titleCard === 'User' && (
                <ViewUser item={dataCard as IUser} titleCard={titleCard} />
            )}

            {titleCard === 'Product' && (
                <ViewProduct item={dataCard as IProduct} titleCard={titleCard} />
            )}
        </div>
    );
};

export default Single;
