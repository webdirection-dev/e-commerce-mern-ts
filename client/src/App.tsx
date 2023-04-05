import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, useAppSelector } from "./store"

import { selectAuthInfo } from "./features/auth/auth-slice"

import Root from "./layout/Root"
import Register from "./pages/authentification/Register"
import Login from "./pages/authentification/Login"


const App = () => {
    const { auth } = useAppSelector(store => selectAuthInfo(store))


    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Root />} />
                    <Route path='/login' element={auth ? <Navigate to='/' replace={true} /> : <Login />} />
                    <Route path='/register' element={auth ? <Navigate to='/' replace={true} /> : <Register />} />
                    <Route path='*' element={<Register />} />
                    <Route path='*' element={<h1 style={{ height: 'calc(100vh - 58.5px - 246.5px)', textAlign: 'center' }}>404. Page not found</h1>} />
                </Routes>
            </BrowserRouter>
        </PersistGate>
    )
}

export default App
