import React, {FC} from 'react'

import './Slider.scss'

import {sliderItems} from "../../static/data/slider-data"
import {useSlider} from "./useSlider"
import SlideItem from "./SlideItem"

import {MdArrowLeft, MdArrowRight} from "react-icons/md"

interface ISliderProps {auto: boolean}

const Slider: FC<ISliderProps> = ({auto}) => {
    const {isDisabledBtn, handleClick, slideIndex, styles, slideIndexSub, stylesSub} = useSlider(auto)

    return(
        <div className='slider'>
            <button
                disabled={isDisabledBtn}
                id='slide-left'
                className="slider__btn"
                onClick={() => handleClick('left')}
            ><MdArrowLeft /></button>

            <ul className="slider__wrapper">
                {
                    sliderItems.map((i, index) => {
                        if (index === slideIndex) {
                            return <SlideItem key={i.id} styles={styles} {...i} />
                        }
                    })
                }

                {
                    sliderItems.map((i, index) => {
                        if (index === slideIndexSub) {
                            return <SlideItem key={i.id} styles={stylesSub} {...i} />
                        }
                    })
                }
            </ul>

            <button
                disabled={isDisabledBtn}
                id='slide-right'
                className="slider__btn"
                onClick={() => handleClick('right')}
            ><MdArrowRight /></button>
        </div>
    )
}

export default Slider