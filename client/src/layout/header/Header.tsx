import {Link} from "react-router-dom"
import Badge from '@mui/material/Badge'
import './header.scss'

import {useHeader} from "./useHeader"

const Header = () => {
    const {
        auth, isWishlist, itemsLength, quantityAllItems, handleReset, handleSingOut, MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdFavorite
    } = useHeader()

    return(
        <header className='header'>
            <div className='header__actions'>
                <button className='header__language'>EN</button>

                <div className='header__search'>
                    <input type="text" placeholder='Search'/>
                    <MdSearch />
                </div>
            </div>

            <Link to='/' className='header__logo' onClick={handleReset} >
                <h1 >.STORE</h1>
            </Link>

            <div className='header__user'>
                {auth ? <>
                        <button className='header__user-action' onClick={handleSingOut}>SING OUT</button>
                        <a href='https://admin.demo2.apwdev.ru' className='header__user-action'>ADMIN PANEL</a>

                    </>
                    :  <>
                        <Link to='/register' className='header__user-action'>REGISTER</Link>
                        <Link to='/login' className='header__user-action'>SING IN</Link>
                    </>
                }

                <Link to='/wishlist' className='header__user-action' onClick={handleReset}>
                    <Badge badgeContent={itemsLength} color="secondary">
                        {
                            isWishlist
                                ? <MdFavorite color="action" style={{fontSize: '24px', color: 'red'}} />
                                : <MdFavoriteBorder style={{fontSize: '24px'}}/>
                        }
                    </Badge>
                </Link>

                <Link to='/cart' className='header__user-action' onClick={handleReset}>
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
