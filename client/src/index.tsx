import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import {store} from "./store"
import {Provider} from "react-redux"

import App from './App'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
    <Provider store={store}>
        <App />
    </Provider>
)