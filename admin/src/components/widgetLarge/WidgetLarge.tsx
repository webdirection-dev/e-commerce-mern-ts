import './widgetLarge.scss'
import { useAppSelector } from '../../static/hooks/hookRedux'
import {selectOrdersInfo} from "../../features/orders/orders-slice"

import WidgetLargeItem from './WidgetLargeItem'

const WidgetLarge = () => {
    const {orders} = useAppSelector((store) => selectOrdersInfo(store))

    return (
        <div className='widgetSm' style={{flex: '2', marginRight: '0'}}>
            <span className='widgetSmTitle'>Orders</span>
            <ul>
                {orders.map((i) => (
                    <WidgetLargeItem key={i._id} item={i} />
                ))}
            </ul>
        </div>
    );
};

export default WidgetLarge;
