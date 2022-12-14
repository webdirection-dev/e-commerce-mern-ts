import React from "react"
import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../static/hooks/hookRedux"
import {singOut} from "../../features/auth/auth-slice"
import {loadUsers, loadStats, getNewUsers} from "../../features/users/users-slice"

import {titleSidebarItem, ISidebarItem} from "../../static/data/sidebar-data"

const SidebarItem: React.FC<ISidebarItem> = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {title, icon, link, index, pathname} = props

    const active = link.split('/')[1] === pathname.split('/')[1] ? 'active' : ''

    return(
        <>
            {index === 0 ? titleSidebarItem[0] : null}
            {index === 1 ? titleSidebarItem[1] : null}
            {index === 5 ? titleSidebarItem[2] : null}
            {index === 7 ? titleSidebarItem[3] : null}
            {index === 10 ? titleSidebarItem[4] : null}

            <Link to={link} className={active}
                onClick={() => {
                    if (title === 'Dashboard') {
                        dispatch(loadUsers(''))
                        dispatch(getNewUsers(''))
                        dispatch(loadStats(''))
                    }

                    if (title === 'Logout') {
                        dispatch(singOut())
                        navigate('/login')
                    }
                }}
            ><li>{icon}<span>{title}</span></li>
            </Link>
        </>
    )
}

export default SidebarItem
