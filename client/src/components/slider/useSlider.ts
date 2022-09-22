import {useEffect, useState} from "react"
import {sliderItems} from "../../static/data/slider-data"

export const useSlider = (auto: boolean) => {
    const [isClick, setIsClick] = useState(false)
    const [isDisabledBtn, setIsDisabledBtn] = useState(false)
    const [styles, setStyles] = useState('slider__slide')
    const [stylesSub, setStylesSub] = useState('slider__slide slider__sub')
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideIndexSub, setSlideIndexSub] = useState(-1)

    const handleClick = (direction: string) => {
        setIsClick(true)
        const length = sliderItems.length
        setIsDisabledBtn(true)

        if (direction === 'left') {
            setStyles('slider__slide ' + 'slide-right')
            setStylesSub('slider__slide slider__sub ' + 'slide-right-sub')
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : length -1)

            if (slideIndex === 0) setSlideIndexSub(0)
            if (slideIndex === length -1) setSlideIndexSub(length -1)
            if (slideIndex < length -1 && slideIndex > 0) setSlideIndexSub(slideIndex)
        }

        if (direction === 'right') {
            setStyles('slider__slide ' + 'slide-left')
            setStylesSub('slider__slide slider__sub ' + 'slide-left-sub')
            setSlideIndex(slideIndex < length -1 ? slideIndex + 1 : 0)

            if (slideIndexSub > slideIndex) setSlideIndexSub(slideIndex)
            if (slideIndexSub < length -1 - 1) setSlideIndexSub(slideIndexSub + 1)
            if (slideIndex === length -1) setSlideIndexSub(length -1)
            if (slideIndex === 0 && slideIndexSub === length -1) setSlideIndexSub(0)
        }

        setTimeout(() => {
            setIsDisabledBtn(false)
        }, 1500)
    }

    useEffect(() => {
        if (auto) {
            const interval = setInterval(() => {
                handleClick('right')
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [slideIndex]);

    return {isDisabledBtn, isClick, handleClick, slideIndex, styles, slideIndexSub, stylesSub}
}