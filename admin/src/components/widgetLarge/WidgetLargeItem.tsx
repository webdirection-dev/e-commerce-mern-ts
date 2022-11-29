import React from 'react'
import { MdVisibility } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {IOrder} from "../../static/types/typesMongo"

interface IPropsWidgetSmItem {
    item: IOrder
}

const WidgetLargeItem: React.FC<IPropsWidgetSmItem> = ({item}) => (
    <li className='widgetSmListItem' >
        <span className='widgetSmUsername'>{item.userId}</span>
        <span className='widgetSmUsername'>${item.amount}</span>
        <span className='widgetSmUsername'>{item.createdAt}</span>

        <Link
            to={'/orders/' + item._id}
            className='widgetSmButton'
            state={{ propsFromWidgetSmall: {data: item} }}
        >
            <MdVisibility className='widgetSmIcon' />
            Status
        </Link>
    </li>
)

export default WidgetLargeItem
