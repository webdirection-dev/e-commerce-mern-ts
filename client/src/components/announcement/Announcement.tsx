import React, { FC } from 'react'
import './Announcement.scss'

interface IAnnouncementProps {}

const Announcement: FC<IAnnouncementProps> = () => (
    <div className='announcement'>
        Super Deal! Free Shipping on Orders Over $50
    </div>
)

export default Announcement