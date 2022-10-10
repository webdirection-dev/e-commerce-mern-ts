import React, { FC } from 'react'
import {Routes, Route} from "react-router-dom"

import Home from "../../pages/home/Home"
import Vitrine from "../../pages/vitrine/Vitrine"
import SingleProduct from "../../pages/singleProduct/SingleProduct"
import Cart from "../../pages/cart/Cart"

const Main: FC = () => {

    return(
        <main>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path='/products'>
                    <Route index element={<Vitrine />} />
                    <Route path=':category' element={<Vitrine />} />
                </Route>

                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />

                <Route path='*' element={ <h1 style={{height: 'calc(100vh - 58.5px - 246.5px)', textAlign: 'center'}}>404. Page not found</h1> } />
            </Routes>
        </main>
    )
}

export default Main