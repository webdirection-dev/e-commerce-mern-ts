import {useAppDispatch, useAppSelector} from "../../static/hooks/hookRedux"

import {defaultAvatar, noImg, storage} from "../../static/configs/firebase"
import {deleteObject, ref} from "firebase/storage"

import {loadStats, selectUsersInfo, removeUser} from "../../features/users/users-slice"
import {selectOrdersInfo} from "../../features/orders/orders-slice"
import {removeProduct, selectProductInfo} from "../../features/products/products-slice"

import {usersColumns, ordersColumns, productsColumns} from "../../static/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    const dispatch = useAppDispatch()
    const {allUsers} = useAppSelector(state => selectUsersInfo(state))
    const {orders} = useAppSelector(state => selectOrdersInfo(state))
    const {products} = useAppSelector(state => selectProductInfo(state))

    const columns =
        type === 'user' ? usersColumns :
        type === 'order' ? ordersColumns :
        type === 'product' ? productsColumns : []

    const rows =
        type === 'user' ? allUsers :
        type === 'order' ? orders :
        type === 'product' ? products : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = async (id: string) => {
        if (type === 'user') {
            dispatch(removeUser(id))
            dispatch(loadStats(''))

            const user = allUsers.find(i => i._id === id)
            if (user) await deleteAvatarFromFirebase(user.profilePic)
        }

        if (type === 'product') {
            dispatch(removeProduct(id))

            const product = products.find(i => i._id === id)
            if (product) await deleteAvatarFromFirebase(product.img)
        }
    }

    return {columns, rows, title, deleteItem}
}

async function deleteAvatarFromFirebase (urlImg: string) {
    if (urlImg !== defaultAvatar && urlImg !== noImg) {
        const desertRef = ref(storage, urlImg);
        await deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {console.error(error)})
    } else return
}
