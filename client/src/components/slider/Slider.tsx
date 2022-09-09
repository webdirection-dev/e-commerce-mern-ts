import React, {FC} from 'react'

import './Slider.scss'
import {useSlider} from './useSlider'
import SlideItem from "./SlideItem"
import {sliderItems} from "../../static/data/slider-data"

import {MdArrowLeft, MdArrowRight} from "react-icons/md"

const Slider: FC = () => {
    const {handleClick, slideIndex} = useSlider()

    return(
        <div className='slider'>
            <button
                id='slide-left'
                className="slider__btn"
                onClick={() => handleClick('left')}
            ><MdArrowLeft /></button>

            <ul className="slider__wrapper" style={{transform: `translateX(${-100 * slideIndex}vw)`}}>
                {
                    sliderItems.map(i => <SlideItem key={i.id} {...i}/>)
                }
            </ul>

            <button
                id='slide-right'
                className="slider__btn"
                onClick={() => handleClick('right')}
            ><MdArrowRight /></button>
        </div>
    )
}

export default Slider