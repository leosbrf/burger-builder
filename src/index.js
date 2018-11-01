import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter /*, Route, Switch, Redirect*/ } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import registerServiceWorker from './registerServiceWorker';


//import Checkout from './containers/Checkout/Checkout';

// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ 
//     && window.__REDUX_DEVTOOLS_EXTENSION__());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ 
        burgerBuilder: burgerBuilderReducer, 
        order: orderReducer 
    });

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <BrowserRouter>
        <App />
        {/* <div>
            <Switch>
                <Route path="/home" component={App}></Route>
                <Route path="/checkout" component={Checkout}></Route>
                <Redirect from="/" exact to="/home" />
                <Route render={() => (<h1>Page Not Found!</h1>)} />
            </Switch>
        </div> */}
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
