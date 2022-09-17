import React, { FC } from 'react'

import './Footer.scss'
import {useFooter} from './useFooter'

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => (
    <footer className='footer'>
        Footer Component
    </footer>
)

export default Footer