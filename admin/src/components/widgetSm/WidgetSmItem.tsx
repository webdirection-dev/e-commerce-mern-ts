import React from 'react'
import { MdVisibility } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {IUser} from "../../static/types/typesMongo"

interface IPropsWidgetSmItem {
    item: IUser
}

const WidgetSmItem: React.FC<IPropsWidgetSmItem> = ({item}) => (
    <li className='widgetSmListItem'>
        <img className='widgetSmImg' src={item.profilePic} alt='img' />

        <div className='widgetSmUser'>
            <span className='widgetSmUsername'>{item.username}</span>
        </div>

        <Link
            to={'/users/' + item._id}
            className='widgetSmButton'
            state={{ propsFromWidgetSmall: {data: item} }}
        >
            <MdVisibility className='widgetSmIcon' />
            Display
        </Link>
    </li>
)

export default WidgetSmItem;
