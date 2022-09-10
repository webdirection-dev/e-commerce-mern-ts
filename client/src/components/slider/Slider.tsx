import React, {FC, useState} from 'react'

import './Slider.scss'
import {sliderItems} from "../../static/data/slider-data"

import {MdArrowLeft, MdArrowRight} from "react-icons/md"

const Slider: FC = () => {
    const [styles, setStyles] = useState('slider__slide')
    const [stylesSub, setStylesSub] = useState('slider__slide slider__sub')
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideIndexSub, setSlideIndexSub] = useState(-1)

    const handleClick = (direction: string) => {
        if (direction === 'left') {
            setStyles('slider__slide ' + 'slide-right')
            setStylesSub('slider__slide slider__sub ' + 'slide-right-sub')
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)

            if (slideIndexSub === -1) setSlideIndexSub(slideIndexSub + 1)
            // if (slideIndex > 0) setSlideIndexSub(slideIndex +1)
            // if (slideIndex === 0 && slideIndexSub === 2) setSlideIndexSub(0)
        }

        if (direction === 'right') {
            setStyles('slider__slide ' + 'slide-left')
            setStylesSub('slider__slide slider__sub ' + 'slide-left-sub')
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)

            if (slideIndexSub < 1) setSlideIndexSub(slideIndexSub + 1)
            if (slideIndex === 2) setSlideIndexSub(2)
            if (slideIndex === 0 && slideIndexSub === 2) setSlideIndexSub(0)
        }
    }

    return(
        <div className='slider'>
            <button
                id='slide-left'
                className="slider__btn"
                onClick={() => handleClick('left')}
            ><MdArrowLeft /></button>

            <ul className="slider__wrapper">
                {
                    sliderItems.map((i, index) => {
                        if (index === slideIndex) {
                            return(
                                <li key={i.id} className={styles} style={{backgroundColor: `${i.bg}`}}>
                                    <div className="slider__slide-img">
                                        <img src={i.img} alt={i.title}/>
                                    </div>

                                    <div className="slider__slide-info">
                                        <h1>{i.title}</h1>
                                        <p>{i.desc}</p>
                                        <button>show now</button>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
                {
                    sliderItems.map((i, index) => {
                        if (index === slideIndexSub) {
                            return(
                                <li key={i.id} className={stylesSub} style={{backgroundColor: `${i.bg}`}}>
                                    <div className="slider__slide-img">
                                        <img src={i.img} alt={i.title}/>
                                    </div>

                                    <div className="slider__slide-info">
                                        <h1>{i.title}</h1>
                                        <p>{i.desc}</p>
                                        <button>show now</button>
                                    </div>
                                </li>
                            )
                        }
                    })
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


// import React, {FC} from 'react'
//
// import './Slider.scss'
// import {useSlider} from './useSlider'
// import SlideItem from "./SlideItem"
// import {sliderItems} from "../../static/data/slider-data"
//
// import {MdArrowLeft, MdArrowRight} from "react-icons/md"
//
// const Slider: FC = () => {
//     const {handleClick, slideIndex} = useSlider()
//
//     return(
//         <div className='slider'>
//             <button
//                 id='slide-left'
//                 className="slider__btn"
//                 onClick={() => handleClick('left')}
//             ><MdArrowLeft /></button>
//
//             <ul className="slider__wrapper" style={{transform: `translateX(${-100 * slideIndex}vw)`}}>
//                 {
//                     sliderItems.map(i => <SlideItem key={i.id} {...i}/>)
//                 }
//             </ul>
//
//             <button
//                 id='slide-right'
//                 className="slider__btn"
//                 onClick={() => handleClick('right')}
//             ><MdArrowRight /></button>
//         </div>
//     )
// }
//
// export default Slider