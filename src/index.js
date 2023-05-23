import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import auth from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import {createStore,compose,applyMiddleware, combineReducers} from 'redux'
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'
const rootReducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer,
    auth:auth
})

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(rootReducer,composeEnhancers(
        applyMiddleware(thunk)
))
const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
