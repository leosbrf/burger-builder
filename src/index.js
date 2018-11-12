import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import './index.css'
import App from './App'
import rootSagaWatcher from "./state/ducks"
import authReducer from "./state/ducks/auth/reducers"
import burgerBuilderReducer from './state/ducks/burgerBuilder/reducers'
import orderReducer from './state/ducks/order/reducers'
import registerServiceWorker from './registerServiceWorker'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSagaWatcher)

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
