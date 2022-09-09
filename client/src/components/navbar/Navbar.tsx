import React, { FC } from 'react'

import './navbar.scss'
import {useNavbar} from './useNavbar'

import {MdSearch, MdOutlineShoppingCart} from 'react-icons/md'
import Badge from '@mui/material/Badge'

interface INavbarProps {}

const Navbar: FC<INavbarProps> = () => {
    const {} = useNavbar

    return(
        <div className='navbar'>
            <div className='navbar__actions'>
                <button className='navbar__language'>EN</button>

                <div className='navbar__search'>
                    <input type="text"/>
                    <MdSearch />
                </div>
            </div>

            <div className='navbar__logo'>
                <h1 >.STORE</h1>
            </div>

            <div className='navbar__user'>
                <button className='navbar__user-action'>REGISTER</button>
                <button className='navbar__user-action'>SING IN</button>

                <button className='navbar__user-action'>
                    <Badge badgeContent={4} color="primary">
                        <MdOutlineShoppingCart
                            color="action"
                            style={{fontSize: '24px'}}
                        />
                    </Badge>
                </button>
            </div>
        </div>
    )
}

export default Navbar