import React from "react"
import './list.scss'

import Datatable from "../../components/datatable/Datatable"

interface IListProps {
    type: string
}

const List: React.FC<IListProps> = ({type}) => {
    return(
        <div className='list'>
            <Datatable type={type}/>
        </div>
    )
}

export default List