import { useAppSelector } from '../../../static/hooks/hookRedux'
import { selectUsersInfo } from '../../../features/users/users-slice'
import {selectOrdersInfo} from "../../../features/orders/orders-slice"

export const useGetWidgetData = () => {
    const {qty: usersQty} = useAppSelector((state) => selectUsersInfo(state))
    const {qty: ordersQty} = useAppSelector((state) => selectOrdersInfo(state))

    return {usersQty, ordersQty}
}
