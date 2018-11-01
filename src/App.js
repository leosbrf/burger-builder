import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from 'hoc/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axios from './axios-orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/" component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withErrorHandler(App, axios);
