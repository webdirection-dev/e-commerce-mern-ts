import {useEffect, useState} from "react"
import {bgLogin} from "../../static/img"

const {imgMini, imgNormal} = bgLogin
const random = Number(
    String(Math.random())
        .split('.')[1]
        .split('')
        .find(i => +i <= 5)
)

export const useBgLogin = () => {
    const [isImfLoaded, setIsImfLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()

        img.src = imgNormal[random] //на этой строке начинается загрузка картинки в память приложения||компонента

        img.onload = () => {
            setIsImfLoaded(true)
        }
    }, [])

    return(
        {
            className: isImfLoaded ? 'loaded' : 'loading',
            src: isImfLoaded ? imgNormal[random] : imgMini[random],
        }
    )
}