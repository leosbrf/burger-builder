import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from 'hoc/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth'
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axios from './axios-orders';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {

    const { isAuthenticated, authRedirectPath } = this.props

    //for unauthenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    )

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to={authRedirectPath} />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios)));
