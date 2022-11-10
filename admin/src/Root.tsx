import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

import { BrowserRouter } from 'react-router-dom'
import App from './components/app/App'

const Root: React.FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    )
}

export default Root
