import './widgetLarge.scss'
import { useAppSelector } from '../../static/hooks/hookRedux'
import { selectUsersInfo } from '../../features/users/users-slice'

import WidgetLargeItem from './WidgetLargeItem'
import {FC} from "react";

interface IWidgetSmUser {whatUsers?: string}

const WidgetLarge: FC<IWidgetSmUser> = ({whatUsers}) => {
    const {allUsers, newUsers} = useAppSelector((state) => selectUsersInfo(state))
    const arrUsers = whatUsers === 'new' ? newUsers : allUsers

    return (
        <div className='widgetSm'>
            <span className='widgetSmTitle'>{whatUsers === 'new' ? 'New Join Members' : `All Users (${allUsers.length})`}</span>
            <ul>
                {arrUsers.map((i) => (
                    <WidgetLargeItem key={i._id} item={i} />
                ))}
            </ul>
        </div>
    );
};

export default WidgetLarge;
