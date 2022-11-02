import React, {FC, useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import './header.scss'

import {useAppDispatch, useAppSelector} from "../../store"
import {resetState} from "../../features/products/product-slice"
import {selectCartInfo} from "../../features/cart/cart-slice"
import {selectWishlistInfo} from "../../features/wishlist/wishlist-slice"

import {MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite} from 'react-icons/md'
import Badge from '@mui/material/Badge'

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const {itemsLength} = useAppSelector(store => selectWishlistInfo(store))
    const [isWishlist, setWishlist] = useState(false)

    useEffect(() => {
        if (itemsLength > 0) setWishlist(true)
        else setWishlist(false)
    }, [itemsLength])

    return(
        <header className='header'>
            <div className='header__actions'>
                <button className='header__language'>EN</button>

                <div className='header__search'>
                    <input type="text" placeholder='Search'/>
                    <MdSearch />
                </div>
            </div>

            <Link
                to='/'
                className='header__logo'
                onClick={() => dispatch(resetState())}
            >
                <h1 >.STORE</h1>
            </Link>

            <div className='header__user'>
                <button className='header__user-action'>REGISTER</button>
                <button className='header__user-action'>SING IN</button>

                <Link to='/wishlist' className='header__user-action' onClick={() => dispatch(resetState())}>
                    {
                        isWishlist
                            ? <MdFavorite style={{fontSize: '24px', color: 'red'}}/>
                            : <MdFavoriteBorder style={{fontSize: '24px'}}/>
                    }
                </Link>

                <Link to='/cart' className='header__user-action' onClick={() => dispatch(resetState())}>
                    <Badge badgeContent={quantityAllItems} color="primary">
                        <MdOutlineShoppingCart
                            color="action"
                            style={{fontSize: '24px'}}
                        />
                    </Badge>
                </Link>
            </div>
        </header>
    )
}

export default Header