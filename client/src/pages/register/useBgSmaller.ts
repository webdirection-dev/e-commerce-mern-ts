import {useEffect, useState} from "react"
import {bgRegister} from "../../static/img"

const {imgMini, imgNormal} = bgRegister

export const useBgSmaller = () => {
    const [isBgLoaded, setIsBgLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.src = imgNormal //на этой строке начинается загрузка картинки в память приложения||компонента

        img.onload = () => {
            setIsBgLoaded(true)
        }
    }, [])

    return(
        {
            className: isBgLoaded ? 'loaded' : 'loading',
            src: isBgLoaded ? imgNormal : imgMini,
        }
    )
}