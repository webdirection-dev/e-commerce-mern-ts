import React, { FC } from 'react'
import {Link} from "react-router-dom"
import './header.scss'

import {MdSearch, MdOutlineShoppingCart} from 'react-icons/md'
import Badge from '@mui/material/Badge'

const Header: FC = () => (
    <header className='header'>
        <div className='header__actions'>
            <button className='header__language'>EN</button>

            <div className='header__search'>
                <input type="text" placeholder='Search'/>
                <MdSearch />
            </div>
        </div>

        <Link to='/' className='header__logo'>
            <h1 >.STORE</h1>
        </Link>

        <div className='header__user'>
            <button className='header__user-action'>REGISTER</button>
            <button className='header__user-action'>SING IN</button>

            <button className='header__user-action'>
                <Badge badgeContent={4} color="primary">
                    <MdOutlineShoppingCart
                        color="action"
                        style={{fontSize: '24px'}}
                    />
                </Badge>
            </button>
        </div>
    </header>
)

export default Header