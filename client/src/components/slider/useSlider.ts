import {useEffect, useState} from "react"

export const useSlider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction: string) => {
        if (direction === 'left') setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        if (direction === 'right') setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }, 7000);

        return () => clearInterval(interval);
    }, [slideIndex]);

    return {handleClick, slideIndex}
}