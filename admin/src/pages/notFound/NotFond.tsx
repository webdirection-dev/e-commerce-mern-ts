import React from "react"
import {Link, useLocation} from "react-router-dom"

const NotFound: React.FC = () => {
    const {pathname} = useLocation()

    return(
        <>
            <h2 style={{marginTop: '50px'}}>
                Page <span style={{color: '#6439ff', textTransform: 'uppercase'}}>{pathname.split('/')[1]}</span> not found
            </h2>
            <h3>Please, go to <Link to='/' style={{color: 'blue', textDecoration: 'none'}}>homepage</Link></h3>
        </>
    )
}

export default NotFound