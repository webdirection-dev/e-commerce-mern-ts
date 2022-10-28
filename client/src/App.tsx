import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import {Provider} from 'react-redux'
import {store} from './store'

import Root from "./layout/Root"
import Register from "./pages/authentification/Register"
import Login from "./pages/authentification/Login"

const  App = () => {
    // let auth = false
    let auth = true

    return(
        <Provider store={store}>
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
        </Provider>
    )
}

export default App