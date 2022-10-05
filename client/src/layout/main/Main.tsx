import React, { FC } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Home from "../../pages/home/Home"
import ProductList from "../../pages/productList/ProductList"
import Product from "../../pages/product/Product"
import Cart from "../../pages/cart/Cart"
import Register from "../../pages/authentification/Register";
import Login from "../../pages/authentification/Login";

const Main: FC = () => {
    // let auth = false
    let auth = true

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/products/:category" element={<ProductList />} />*/}

                <Route path='products'>
                    <Route index element={<ProductList />} />
                    <Route path=':category' element={<ProductList />} />
                </Route>

                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />

                {/*<Route*/}
                {/*    path='login'*/}
                {/*    element={*/}
                {/*        auth ? <Navigate to='/' replace={true} /> : <Login />*/}
                {/*    }*/}
                {/*/>*/}
            </Routes>
        </main>
    )
}

export default Main