import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

import Pay from './Pay'
import Success from './Success'

import Root from "./layout/Root"
import Register from "./pages/authentification/Register"
import Login from "./pages/authentification/Login"

const  App = () => (
    <BrowserRouter>
        {/*<Routes>*/}
        {/*    <Route path="/pay" element={<Pay />} />*/}
        {/*    <Route path="/success" element={<Success />} />*/}
        {/*</Routes>*/}

        {/*<Root />*/}
        <Register />
        {/*<Login />*/}
    </BrowserRouter>
)

export default App
