import {
    MdOutlineAccountBalanceWallet,
    MdOutlineMonetizationOn,
    MdOutlineShoppingCart,
    MdPersonOutline,
} from 'react-icons/md';

export const widgetsData = [
    {
        type: 'users',
        title: 'USERS',
        isMoney: false,
        link: 'See all users',
        icon: (
            <MdPersonOutline
                className='icon'
                style={{
                    color: 'crimson',
                    backgroundColor: 'rgba(255, 0, 0, .2)',
                }}
            />
        ),
    },
    {
        type: 'movies',
        title: 'MOVIES',
        isMoney: false,
        link: 'View all movies',
        icon: (
            <MdOutlineShoppingCart
                className='icon'
                style={{
                    color: '#ee7d36',
                    backgroundColor: 'rgba(218, 165, 32, .2)',
                }}
            />
        ),
    },
    {
        type: 'lists',
        title: 'LISTS',
        isMoney: false,
        link: 'View net lists',
        icon: (
            <MdOutlineMonetizationOn
                className='icon'
                style={{
                    color: 'darkblue',
                    backgroundColor: '#afe7fd',
                }}
            />
        ),
    },
    {
        type: 'balance',
        title: 'BALANCE',
        isMoney: true,
        link: 'See details',
        icon: (
            <MdOutlineAccountBalanceWallet
                className='icon'
                style={{
                    color: 'purple',
                    backgroundColor: 'rgba(128, 0, 128, .2)',
                }}
            />
        ),
    },
];
