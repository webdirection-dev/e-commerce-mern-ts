import React from "react"
import './featured.scss'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import {MdMoreVert, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"

const Featured: React.FC = () => {

    return(
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MdMoreVert className='featured-icon'/>
            </div>

            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={70}
                        text={'70%'}
                        strokeWidth={5}
                    />
                </div>

                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="description">
                    Previous transactions processing. Last payments not be included.
                </p>

                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <MdOutlineKeyboardArrowUp style={{fontSize: '20px'}}/>
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="itemTitle">Last week</div>
                        <div className="itemResult positive">
                            <MdOutlineKeyboardArrowUp style={{fontSize: '20px'}}/>
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <MdOutlineKeyboardArrowDown style={{fontSize: '20px'}}/>
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured