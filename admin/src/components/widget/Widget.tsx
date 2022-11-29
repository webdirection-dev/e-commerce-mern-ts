import React from 'react';
import { Link } from 'react-router-dom';
import './widget.scss';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { widgetsData } from '../../static/data/widgets-data';

interface IWidget {
    type: string;
    counter?: number;
}

const Widget: React.FC<IWidget> = ({ type, counter }) => {
    const diff = 25;

    return (
        <>
            {widgetsData.map((i) => {
                if (i.type === type) {
                    return (
                        <div key={type} className='widget'>
                            <div className='left'>
                                <span className='title'>{i.title}</span>
                                <span className='counter'>
                                    {i.isMoney && '$'}
                                    {counter || 100}
                                </span>
                                <Link to={'/' + type} className='link'>
                                    {i.link}
                                </Link>
                            </div>

                            <div className='right'>
                                <div className='percentage positive'>
                                    <MdKeyboardArrowUp className='percentageIcon' />
                                    {diff}%
                                </div>
                                {i.icon}
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </>
    )
}

export default Widget
