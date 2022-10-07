import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Header from "./layout/header/Header"
import Footer from "./layout/footer/Footer"

import Pay from './Pay'
import Success from './Success'

import Root from "./layout/Root"
import Register from "./pages/authentification/Register"
import Login from "./pages/authentification/Login"
import React from "react";

const  App = () => {
    // let auth = false
    let auth = true

    return(
        <BrowserRouter>
            {!auth && (
                <Routes>
                    <Route
                        path='/'
                        element={ !auth && <Navigate to='/login' replace={true} /> }
                    />

                    <Route
                        path='/login'
                        element={ auth ? <Navigate to='/' replace={true} /> : <Login /> }
                    />

                    <Route
                        path='/register'
                        element={ auth ? <Navigate to='/' replace={true} /> : <Register /> }
                    />


                    <Route path='*' element={ <h1 style={{height: 'calc(100vh - 58.5px - 246.5px)', textAlign: 'center'}}>404. Page not found</h1> } />
                </Routes>
            )}

            {auth && <Root />}
        </BrowserRouter>
    )
}

export default App