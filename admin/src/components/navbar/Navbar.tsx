import React, {FC, Dispatch, SetStateAction} from "react"
import './navbar.scss'
import {
    MdOutlineSearch,
    MdOutlineLanguage,
    MdDarkMode,
    MdOutlineDarkMode,
    MdOutlineFullscreenExit,
    MdOutlineNotificationsNone,
    MdChatBubbleOutline,
    MdOutlineList,
} from "react-icons/md";

interface INav {
    setDark: Dispatch<SetStateAction<boolean>>;
    dark: boolean
}

const Navbar: FC<INav> = ({setDark, dark}) => {

    return(
        <nav className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search...'/>
                    <MdOutlineSearch className='icon'/>
                </div>

                <div className="items">
                    <div className="item">
                        <MdOutlineLanguage className='icon'/>
                        English
                    </div>

                    {!dark &&
                        <div className="item" onClick={() => setDark(!dark)}>
                            <MdOutlineDarkMode className='icon'/>
                        </div>
                    }

                    {dark &&
                        <div className="item" onClick={() => setDark(!dark)}>
                            <MdDarkMode className='icon'/>
                        </div>
                    }

                    <div className="item">
                        <MdOutlineFullscreenExit className='icon'/>
                    </div>

                    <div className="item">
                        <MdOutlineNotificationsNone className='icon'/>
                        <div className="counter">5</div>
                    </div>

                    <div className="item">
                        <MdChatBubbleOutline className='icon'/>
                        <div className="counter">1</div>
                    </div>

                    <div className="item">
                        <MdOutlineList className='icon'/>
                    </div>


                    <div className="item">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mghPNlL2-SjLTPt3t-6UKaKikzReD8lFQw&usqp=CAU"
                            alt="..."
                            className='avatar'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar