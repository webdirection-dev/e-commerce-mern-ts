import React, { FC } from 'react'
import './Popup.scss'
import {usePopup} from './usePopup'
import {motion, AnimatePresence} from "framer-motion"
import {closeIcon} from "../../static/img"

interface IPopupProps {
    isPopup: boolean;
    handlePopup: (act: string) => void;
}

const Popup: FC<IPopupProps> = ({isPopup, handlePopup}) => {
    const {} = usePopup()

    const myVariant = {
        hidden: {
            x: 1000,
            opacity: 0,
            height: 0,
            // padding: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            height: 'auto',
        },
        end: {
            height: 0,
        }
    }

    return(
        <AnimatePresence>
            {
                isPopup && (
                    <div className='popup'>
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
                                onClick={() => handlePopup('auto')}
                                whileHover={{
                                    scale: 1.5,
                                    rotate: 180,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                            />

                            <h2 className='popup__title'>Обратный звонок</h2>
                            <p className="popup__txt">Укажите свой номер телефона, и наш менеджер свяжется с вами в течение<br/>5 минут.</p>
                            <p className='popup__subtitle' >Телефон</p>
                        </motion.div>
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default Popup