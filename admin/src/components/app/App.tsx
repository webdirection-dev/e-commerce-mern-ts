import { Route, Routes, Navigate } from 'react-router-dom'
import './app.scss'

import Login from '../../pages/login/Login'
import Main from '../../layout/Main'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import NotFond from '../../pages/notFound/NotFond'

import {useApp} from "./use-app"

function App() {
    const {auth, dark, setDark} = useApp()

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={!auth && <Navigate to='/login' replace={true} />}
                />
                <Route
                    path='/login'
                    element={
                        auth ? <Navigate to='/' replace={true} /> : <Login />
                    }
                />
                <Route path='*' element={!auth && <NotFond />} />
            </Routes>

            {auth && (
                <div className='app'>
                    <Sidebar setDark={setDark} dark={dark} />

                    <div className='container'>
                        <Navbar setDark={setDark} dark={dark} />
                        <Main />
                    </div>
                </div>
            )}
        </>
    )
}

export default App
