import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter /*, Route, Switch, Redirect*/ } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import ingredients from './store/reducers/ingredients';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import Checkout from './containers/Checkout/Checkout';

const store = createStore(ingredients);

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
