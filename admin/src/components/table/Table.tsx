import React from "react"
import './table.scss'

import {tableData} from "../../static-data/data/table-data"
import {Table as MyTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'

const Table: React.FC = () => {

    return(
        <TableContainer component={Paper} className='table'>
            <MyTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableCell'>Tracking ID</TableCell>
                        <TableCell className='tableCell'>Product</TableCell>
                        <TableCell className='tableCell'>Customer</TableCell>
                        <TableCell className='tableCell'>Date</TableCell>
                        <TableCell className='tableCell'>Amount</TableCell>
                        <TableCell className='tableCell'>Payment Method</TableCell>
                        <TableCell className='tableCell'>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableData.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell className='tableCell'>{row.id}</TableCell>

                            <TableCell className='tableCell'>{
                                <div className="cellWrapper">
                                    <img src={row.img} alt={row.product} className="img"/>
                                    {row.product}
                                </div>
                            }</TableCell>

                            <TableCell className='tableCell'>{row.customer}</TableCell>
                            <TableCell className='tableCell'>{row.date}</TableCell>
                            <TableCell className='tableCell'>{row.amount}</TableCell>
                            <TableCell className='tableCell'>{row.method}</TableCell>

                            <TableCell className='tableCell'>
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MyTable>
        </TableContainer>
    )
}

export default Table