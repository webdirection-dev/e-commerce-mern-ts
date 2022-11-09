import React from 'react';
import { useAppDispatch } from '../../hooks/hookRedux';
import { clearUserId } from '../../features/users/users-slice';
import { MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';

const WidgetSmItem: React.FC<{ [key: string]: string }> = (props) => {
    const dispatch = useAppDispatch();
    const { _id, profilePic, username } = props;

    return (
        <li className='widgetSmListItem' onClick={() => dispatch(clearUserId())} >
            <img className='widgetSmImg' src={profilePic} alt='img' />

            <div className='widgetSmUser'>
                <span className='widgetSmUsername'>{username}</span>
            </div>

            <Link to={'/users/' + _id} className='widgetSmButton'>
                <MdVisibility className='widgetSmIcon' />
                Display
            </Link>
        </li>
    );
};

export default WidgetSmItem;
