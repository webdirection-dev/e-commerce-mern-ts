import React from "react"
import {useBgLogin} from "./use-bg-login"

const ImgBackground: React.FC = () => {
    const {className, src} = useBgLogin()

    return <img className={className} src={src} alt="img"/>
}

export default ImgBackground