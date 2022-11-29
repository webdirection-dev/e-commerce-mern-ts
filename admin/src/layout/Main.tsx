import { Route, Routes, Navigate } from 'react-router-dom'
import {useAppSelector} from "../static/hooks/hookRedux"
import {selectAuthInfo} from "../features/auth/auth-slice"

import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import List from '../pages/list/List'
import Single from '../pages/single/Single'
import NewUser from '../features/users/NewUser'
import NotFond from '../pages/notFound/NotFond'

const Main = () => {
    const {auth} = useAppSelector(store => selectAuthInfo(store))
    return (
        <div className='main'>
            <Routes>
                <Route path='/'>
                    <Route index element={!auth ? <Navigate to='/login' replace={true} /> : <Home />} />

                    <Route path='users'>
                        <Route index element={<List type='user' />} />
                        <Route path=':userId' element={<Single />} />
                        <Route path='new' element={<NewUser />} />
                    </Route>

                    <Route path='orders'>
                        <Route index element={<List type='order' />} />
                        <Route path=':orderId' element={<Single />} />
                    </Route>
                </Route>

                <Route path='login' element={auth ? <Navigate to='/' replace={true} /> : <Login />} />

                <Route path='*' element={<NotFond />} />
            </Routes>
        </div>
    )
}

export default Main;
