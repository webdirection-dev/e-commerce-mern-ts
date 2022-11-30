import React from 'react'
import {format} from "timeago.js"
import { MdInfoOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {IOrder} from "../../static/types/typesMongo"

interface IPropsWidgetSmItem {
    item: IOrder
}

const WidgetLargeItem: React.FC<IPropsWidgetSmItem> = ({item}) => (
    <tr>
        <td className='widgetSmUsername'>{item.userId}</td>
        <td className='widgetSmUsername' style={{textAlign: 'center'}}>${item.amount}</td>
        <td className='widgetSmUsername' style={{textAlign: 'center'}}><span className={`widgetLgStatus ${item.status}`}>{item.status}</span></td>
        <td className='widgetSmUsername'>{format(item.createdAt)}</td>
        <td className='widgetSmUsername' style={{textAlign: 'center'}}>
            <Link
                to={'/orders/' + item._id}
                className=' widgetLgButton'
                state={{ propsFromWidgetSmall: {data: item} }}
            >
                <MdInfoOutline className='widgetSmIcon' />
            </Link>
        </td>
    </tr>
)

export default WidgetLargeItem
