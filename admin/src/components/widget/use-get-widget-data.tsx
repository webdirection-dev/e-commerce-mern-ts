import React, {ReactElement, useEffect, useState} from "react"
import {
    MdOutlineAccountBalanceWallet,
    MdOutlineMonetizationOn,
    MdOutlineShoppingCart,
    MdPersonOutline
} from "react-icons/md"

interface IWidgetData {
    title: string;
    isMoney: boolean;
    link: string;
    icon: ReactElement;
}

export const UseGetWidgetData = (type: string) => {
    const [data, setData] = useState({} as IWidgetData)

    useEffect(() => {
        switch (type) {
            case 'user':
                setData({
                    title: "USERS",
                    isMoney: false,
                    link: 'See all users',
                    icon: <MdPersonOutline className='icon' />,
                })
                break

            case 'order':
                setData({
                    title: "ORDERS",
                    isMoney: false,
                    link: 'View all orders',
                    icon: <MdOutlineShoppingCart className='icon' />,
                })
                break

            case 'earning':
                setData({
                    title: "EARNING",
                    isMoney: true,
                    link: 'View net earnings',
                    icon: <MdOutlineMonetizationOn className='icon' />,
                })
                break

            case 'balance':
                setData({
                    title: "BALANCE",
                    isMoney: true,
                    link: 'See details',
                    icon: <MdOutlineAccountBalanceWallet className='icon' />,
                })
                break

            default: break
        }
    }, [type])

    return data
}