import React  from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import {useAppSelector} from "../hooks/hookRedux"
import {selectAuthInfo} from "../features/auth/auth-slice"

import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import List from '../pages/list/List'
import Single from '../pages/single/Single'

import NewUser from '../features/users/NewUser'
import NewMovie from '../features/movies/NewMovie'
import NewList from '../features/lists/NewList'

import NotFond from '../pages/notFound/NotFond'

import { movieInputs } from '../static-data/data/form-source'

const Main: React.FC = () => {
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

                    <Route path='movies'>
                        <Route index element={<List type='movie' />} />
                        <Route path=':movieId' element={<Single />} />
                        <Route
                            path='new'
                            element={<NewMovie inputs={movieInputs} />}
                        />
                    </Route>

                    <Route path='lists'>
                        <Route index element={<List type='list' />} />
                        <Route path=':listId' element={<Single />} />
                        <Route path='new' element={<NewList title='List' />} />
                    </Route>
                </Route>

                <Route path='login' element={auth ? <Navigate to='/' replace={true} /> : <Login />} />

                <Route path='*' element={<NotFond />} />
            </Routes>
        </div>
    )
}

export default Main
