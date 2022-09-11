import {useEffect, useState} from "react"
import {sliderItems} from "../../static/data/slider-data"

export const useSlider = (auto: boolean) => {
    const [styles, setStyles] = useState('slider__slide')
    const [stylesSub, setStylesSub] = useState('slider__slide slider__sub')
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideIndexSub, setSlideIndexSub] = useState(-1)
    const [isDisabledBtn, setIsDisabledBtn] = useState(false)

    const handleClick = (direction: string) => {
        const items = sliderItems.length
        setIsDisabledBtn(true)

        if (direction === 'left') {
            setStyles('slider__slide ' + 'slide-right')
            setStylesSub('slider__slide slider__sub ' + 'slide-right-sub')
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : items -1)

            if (slideIndex === 0) setSlideIndexSub(0)
            if (slideIndex === items -1) setSlideIndexSub(items -1)
            if (slideIndex < items -1 && slideIndex > 0) setSlideIndexSub(slideIndex)
        }

        if (direction === 'right') {
            setStyles('slider__slide ' + 'slide-left')
            setStylesSub('slider__slide slider__sub ' + 'slide-left-sub')
            setSlideIndex(slideIndex < items -1 ? slideIndex + 1 : 0)

            if (slideIndexSub < items -1 - 1) setSlideIndexSub(slideIndexSub + 1)
            if (slideIndex === items -1) setSlideIndexSub(items -1)
            if (slideIndex === 0 && slideIndexSub === items -1) setSlideIndexSub(0)
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

    return {isDisabledBtn, handleClick, slideIndex, styles, slideIndexSub, stylesSub}
}