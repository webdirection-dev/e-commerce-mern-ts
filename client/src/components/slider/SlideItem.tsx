import React, { FC } from 'react'

import {slider} from "../../static/img"
import {useBgSmaller} from "../../static/hooks/useBgSmaller"

interface ISlideItemProps {
    id: number;
    title: string;
    desc: string;
    bg: string;
    styles: string;
    isClick: number;
}

const SlideItem: FC<ISlideItemProps> = ({isClick, id, title, desc, bg, styles}) => {
    const {className, src} = useBgSmaller(slider,id -1)

    return(
        <li className={styles} style={{backgroundColor: `${bg}`}}>
            <div className="slider__slide-img">
                <img src={src} alt={title} className={isClick > 0 ? undefined : className}/>
            </div>

            <div className="slider__slide-info">
                <h1>{title}</h1>
                <p>{desc}</p>
                <button>show now</button>
            </div>
        </li>
    )
}

export default SlideItem