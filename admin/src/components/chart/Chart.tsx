import React from 'react'
import './chart.scss'
import { IDataForRender} from "../../static/data/stat-data"

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface IChart {
    aspect: number;
    title: string;
    userStat?: IDataForRender[];
    myDataKey?: string;
}

const Chart: React.FC<IChart> = ({ aspect, title, userStat, myDataKey }) => {
    return (
        <div className='chart'>
            <div className='title'>{title}</div>

            <ResponsiveContainer width='100%' aspect={aspect}>
                <AreaChart
                    data={userStat}
                    width={730}
                    height={250}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
                            <stop
                                offset='5%'
                                stopColor='#8884d8'
                                stopOpacity={0.8}
                            />
                            <stop
                                offset='95%'
                                stopColor='#8884d8'
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey='name' stroke='gray' />
                    {/* <YAxis /> */}

                    <CartesianGrid
                        className='chartGrid'
                        strokeDasharray='3 3'
                    />

                    <Tooltip />

                    <Area
                        type='monotone'
                        dataKey={myDataKey as string}
                        stroke='#8884d8'
                        fillOpacity={1}
                        fill='url(#total)'
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;



// import React from 'react';
// import './chart.scss';
// import { IDataForRender } from '../../static/data/stat-data';
//
// import {
//     AreaChart,
//     Area,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from 'recharts';
//
// interface IChart {
//     aspect: number;
//     title: string;
//     userStat?: IDataForRender[];
//     myDataKey?: string;
// }
//
// const Chart: React.FC<IChart> = ({ aspect, title, userStat, myDataKey }) => {
//
//     return (
//         <div className='chart'>
//             <div className='title'>{title}</div>
//
//             <ResponsiveContainer width='100%' aspect={aspect}>
//                 <AreaChart
//                     data={userStat}
//                     width={730}
//                     height={250}
//                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                 >
//                     <defs>
//                         <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
//                             <stop
//                                 offset='5%'
//                                 stopColor='#8884d8'
//                                 stopOpacity={0.8}
//                             />
//                             <stop
//                                 offset='95%'
//                                 stopColor='#8884d8'
//                                 stopOpacity={0}
//                             />
//                         </linearGradient>
//                     </defs>
//
//                     <XAxis dataKey='name' stroke='gray' />
//                     {/* <YAxis /> */}
//
//                     <CartesianGrid
//                         className='chartGrid'
//                         strokeDasharray='3 3'
//                     />
//
//                     <Tooltip />
//
//                     <Area
//                         type='monotone'
//                         dataKey={myDataKey as string}
//                         stroke='#8884d8'
//                         fillOpacity={1}
//                         fill='url(#total)'
//                     />
//                 </AreaChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };
//
// export default Chart;
