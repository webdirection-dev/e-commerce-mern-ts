import './featured.scss'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {MdMoreVert, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md"

import {useFeatured} from "./useFeatured"

const Featured = () => {
    const {income, percent, total, progressStyles} = useFeatured()

    return(
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MdMoreVert className='featured-icon'/>
            </div>

            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={percent} text={`${percent}%`} strokeWidth={5} styles={progressStyles}/>
                </div>

                <p className="title">Total sales</p>
                <p className="amount">${total}</p>
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
                            <div className="resultAmount">${income[1] && income[1].total}</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className={`itemResult ${percent < 0 ? 'negative' : 'positive'}`}>
                            {percent < 0 && <MdOutlineKeyboardArrowDown style={{fontSize: '20px'}}/>}
                            {percent >= 0 && <MdOutlineKeyboardArrowUp style={{fontSize: '20px'}}/>}
                            <div className="resultAmount">${income[1] && income[1].total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
