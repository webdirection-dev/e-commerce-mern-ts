import React, { FC } from 'react'

interface ISlideItemProps {
    id?: number;
    img: string;
    title: string;
    desc: string;
    bg: string;
}

const SlideItem: FC<ISlideItemProps> = ({img, title, desc, bg}) => {

    return(
        <li className="slider__slide" style={{backgroundColor: `${bg}`}}>
            <div className="slider__slide-img">
                <img src={img} alt={title}/>
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