import {useEffect, useState} from "react"

export const useBgSmaller = ({imgNormal, imgMini}: {[key: string]: string[]}, idx = 0) => {
    const [isBgLoaded, setIsBgLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.src = imgNormal[idx] //на этой строке начинается загрузка картинки в память приложения||компонента

        img.onload = () => {
            setIsBgLoaded(true)
        }
    }, [])

    return(
        {
            className: isBgLoaded ? 'loaded' : 'loading',
            src: isBgLoaded ? imgNormal[idx] : imgMini[idx],
        }
    )
}