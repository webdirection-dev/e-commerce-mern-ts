import React from 'react'
import { useAppDispatch } from '../../static/hooks/hookRedux'
import { clearUserId } from '../../features/users/users-slice'
import { MdVisibility } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {IUser} from "../../static/types/types"

interface IPropsWidgetSmItem {
    item: IUser
}

const WidgetLargeItem: React.FC<IPropsWidgetSmItem> = ({item}) => {
    const dispatch = useAppDispatch();
    const { _id, profilePic, username } = item;

    return (
        <li className='widgetSmListItem' onClick={() => dispatch(clearUserId())} >
            <img className='widgetSmImg' src={profilePic} alt='img' />

            <div className='widgetSmUser'>
                <span className='widgetSmUsername'>{username}</span>
            </div>

            <Link
                to={'/users/' + _id}
                className='widgetSmButton'
                state={{ propsFromWidgetSmall: {data: item} }}
            >
                <MdVisibility className='widgetSmIcon' />
                Display
            </Link>
        </li>
    );
};

export default WidgetLargeItem;
