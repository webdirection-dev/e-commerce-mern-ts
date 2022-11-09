import React, {SetStateAction, Dispatch} from "react"
import {useNavigate} from "react-router-dom"
import './style/popUpSubmitNew.scss'

import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineClose} from "react-icons/md"

import {usePopupSubmit} from "./hooks/use-popup-submit"
import {TypeInfoAboutItem} from "./hooks/use-upload-firebase"

interface IPropPopupNew {
    setIsShowPopup: Dispatch<SetStateAction<boolean>>;
    setIsResetMedia: Dispatch<SetStateAction<boolean>>;
    handleSwitchPopup: () => void;
    handleUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    infoAboutItem: TypeInfoAboutItem;
    isAllReady: boolean;
}

const PopupSubmitMovie: React.FC<IPropPopupNew> = (props) => {
    const navigate = useNavigate()
    const {setIsShowPopup, setIsResetMedia, handleSwitchPopup, handleUpload, infoAboutItem, isAllReady} = props
    const {
        className,
        popStyle,
        notify,
        isSubmit,
        setIsSubmit,
    } = usePopupSubmit(isAllReady)

    return(
        <div className='popUp'>
            <div
                className={'container-popup ' + className}
                style={{
                    background: `${popStyle}`,
                }}
            >
                <div
                    title='Clear form and Сlose'
                    className={!isSubmit ? 'close visibility' : 'close hidden'}
                    onClick={() => {
                        handleSwitchPopup()
                        setIsResetMedia(true)
                    }}
                >
                    <div className='icon' title='Clear form and Сlose'>
                        <MdOutlineClose title='Clear form and Сlose'/>
                    </div>
                </div>

                <div className='content'>
                    <ul className="monitor showLogs">
                        <h3 className='title'>Information:</h3>

                        {
                            infoAboutItem.map((i) => (
                                <li key={i.name + String(Math.random())}>
                                    {i.name}: <span>{i.value}</span>
                                </li>
                            ))
                        }
                    </ul>

                    <h2>{notify}</h2>
                </div>

                <div className="footer">
                    <button
                        className={!isSubmit ? 'change slide-left' : 'change slide-left-hidden'}
                        onClick={() => setIsShowPopup(false)}
                    >CHANGE <MdKeyboardArrowLeft /></button>

                    <button
                        className={!isSubmit ? 'submit slide-right' : 'submit slide-right-hidden'}
                        onClick={(e) => {
                            setIsSubmit(true)
                            handleUpload(e)
                        }}
                    >SUBMIT <MdKeyboardArrowRight /></button>

                    {isSubmit && isAllReady && (
                        <button
                            className='closeBtn'
                            onClick={() => {
                                navigate('../')
                                // handleSwitchPopup()
                                // setIsResetMedia(true)
                            }}
                        >CLOSE</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopupSubmitMovie