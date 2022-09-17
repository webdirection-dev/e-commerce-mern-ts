import React, { FC } from 'react'
import './BreakLine.scss'

interface IBreakLineProps {
    txt: string;
    fs?: number
}

const BreakLine: FC<IBreakLineProps> = ({txt, fs = 20}) => (
    <section className='break-line'>
        <h1 style={{fontSize: `${fs}px`}}>{txt}</h1>
    </section>
)

export default BreakLine