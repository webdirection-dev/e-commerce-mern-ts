import {useEffect, useState} from "react"
import {useBgLogin} from "../../../components/imgBackground/use-bg-login"

export const usePopupSubmit = (isAllReady: boolean) => {
    const [isSubmit, setIsSubmit] = useState(false)

    const {className, src} = useBgLogin()
    const popStyle = ` 
        linear-gradient(0deg, transparent 0%, rgba(34,193,195,.5) 15%, rgba(34,193,195,.8) 50%, transparent 100%),
        center / cover no-repeat url(${src})
    `

    const notify =
        !isSubmit ? 'Could you upload data?' :
        !isAllReady ? 'Data is about to be sent...' : 'Movie added!'

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        {
            className,
            popStyle,
            notify,
            isSubmit,
            setIsSubmit,
        }
    )
}