import React, { FC } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Home from "../../pages/home/Home"
import ProductList from "../../pages/productList/ProductList"
import Product from "../../pages/product/Product"
import Cart from "../../pages/cart/Cart"

const Main: FC = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path='/products'>
                    <Route index element={<ProductList />} />
                    <Route path=':category' element={<ProductList />} />
                </Route>

                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />

                <Route path='*' element={ <h1 style={{height: 'calc(100vh - 58.5px - 246.5px)', textAlign: 'center'}}>404. Page not found</h1> } />
            </Routes>
        </main>
    )
}

export default Main