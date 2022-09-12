import React, { FC } from 'react'
import './BreakLine.scss'

interface IBreakLineProps {
    txt: string;
    fs?: number
}

const BreakLine: FC<IBreakLineProps> = ({txt, fs = 20}) => (
    <div className='break-line' style={{fontSize: `${fs}px`}}>{txt}</div>
)

export default BreakLine