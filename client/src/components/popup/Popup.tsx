import React, { FC } from 'react'
import './Popup.scss'
import {usePopup} from './usePopup'
import {motion, AnimatePresence} from "framer-motion"
import {closeIcon} from "../../static/img"
import {Link} from "react-router-dom";
import {MdAddShoppingCart} from "react-icons/md";

interface IPopupProps {
    isPopup: boolean;
    handlePopup: (act: string) => void;
}

const Popup: FC<IPopupProps> = ({isPopup, handlePopup}) => {
    const {handleResetPopup, myVariant, _id, img, title, size, color, price} = usePopup()

    return(
        <AnimatePresence>
            {
                isPopup && (
                    <div className='popup'>
                        <div className="popup__wrapper">
                            <motion.div
                                className="popup__content"
                                initial={'hidden'}
                                animate={'visible'}
                                transition={{
                                    duration: 0.5,
                                    type: 'tween',
                                }}
                                variants={myVariant}
                                exit={'end'}
                            >
                                <motion.img
                                    src={closeIcon} alt="..."
                                    className='popup__close'
                                    onClick={() => {
                                        handleResetPopup()
                                        handlePopup('auto')
                                    }}
                                    whileHover={{
                                        scale: 1.5,
                                        rotate: 180,
                                        transition: {
                                            duration: 0.5
                                        }
                                    }}
                                />

                                <img src={img} alt={title} className='popup__img'/>

                                <ul className='popup__list'>
                                    <li><b>product:</b> {title}</li>

                                    <li className='popup__chose'>
                                        <b>size:</b>
                                        {size.map((i: string, index: number, array: string[]) => {
                                            return(
                                                <div key={i} style={{marginLeft: '5px'}}>
                                                    {i}{index !== array.length -1 ? ',' : ''}
                                                </div>
                                            )
                                        })}
                                    </li>

                                    <li className='popup__chose'>
                                        <b>color:</b>
                                        {color.map((i: string) => <div key={i} className='popup__chose-color' style={{backgroundColor: `${i}`}}></div>)}
                                    </li>

                                    <li><b>id:</b> {_id}</li>
                                </ul>

                                <div className="popup__price">
                                    <span>$ {price}</span>

                                    <Link to={`/product/${_id}`} onClick={handleResetPopup}>
                                        <MdAddShoppingCart />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default Popup