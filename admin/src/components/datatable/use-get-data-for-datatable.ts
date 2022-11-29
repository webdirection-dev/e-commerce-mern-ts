import {useAppDispatch, useAppSelector} from "../../static/hooks/hookRedux"

import {defaultAvatar, storage} from "../../static/configs/firebase"
import {deleteObject, ref} from "firebase/storage"

import {selectUsersInfo, removeUser} from "../../features/users/users-slice"
import {selectOrdersInfo} from "../../features/orders/orders-slice"

import {userColumns, ordersColumns} from "../../static/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    console.log(type)
    const dispatch = useAppDispatch()
    const {allUsers} = useAppSelector(state => selectUsersInfo(state))
    const {orders} = useAppSelector(state => selectOrdersInfo(state))

    const columns =
        type === 'user' ? userColumns :
        type === 'order' ? ordersColumns : []

    const rows =
        type === 'user' ? allUsers :
        type === 'order' ? orders : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = async (id: string) => {
        if (type === 'user') {
            dispatch(removeUser(id))

            const user = allUsers.find(i => i._id === id)
            if (user) await deleteAvatarFromFirebase(user.profilePic)
        }
    }

    return {columns, rows, title, deleteItem}
}

async function deleteAvatarFromFirebase (urlImg: string) {
    if (urlImg !== defaultAvatar) {
        const desertRef = ref(storage, urlImg);
        await deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
                console.error(error)
            });
    } else return
}
