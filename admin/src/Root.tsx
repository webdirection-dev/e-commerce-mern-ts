import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'

import App from './components/app/App'

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
