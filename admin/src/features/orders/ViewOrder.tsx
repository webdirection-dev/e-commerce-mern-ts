import './style/editOrder.scss'
import { useUpdateOrder } from './hooks/use-update-order'

const ViewOrder = () => {
    const {} = useUpdateOrder()

    return (
        <h1>Orders</h1>
    )
}

export default ViewOrder
