import './widgetSm.scss'
import { useAppSelector } from '../../static/hooks/hookRedux'
import { selectUsersInfo } from '../../features/users/users-slice'

import WidgetSmItem from './WidgetSmItem'
import {FC} from "react";

interface IWidgetSmUser {whatUsers: string}

const WidgetSm: FC<IWidgetSmUser> = ({whatUsers}) => {
    const {allUsers, newUsers} = useAppSelector((state) => selectUsersInfo(state))
    const arrUsers = whatUsers === 'new' ? newUsers : allUsers

    return (
        <div className='widgetSm'>
            <span className='widgetSmTitle'>{whatUsers === 'new' ? 'New Join Members' : `All Users (${allUsers.length})`}</span>
            <ul>
                {arrUsers.map((i) => (
                    <WidgetSmItem key={i._id} item={i} />
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
