import {useEffect, useState} from "react"
import {slider} from "../../../static/img"

const {imgMini, imgNormal} = slider

export const useImgSmaller = (idx: number) => {
    const [isImfLoaded, setIsImfLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.src = imgNormal[idx] //на этой строке начинается загрузка картинки в память приложения||компонента

        img.onload = () => {
            setIsImfLoaded(true)
        }
    }, [])

    return(
        {
            className: isImfLoaded ? 'loaded' : 'loading',
            src: isImfLoaded ? imgNormal[idx] : imgMini[idx],
        }
    )
}