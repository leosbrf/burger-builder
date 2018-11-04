import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from 'hoc/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axios from './axios-orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {

    const { isAuthenticated } = this.props

    //for unauthenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    )

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
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
    isAuthenticated: state.auth.idToken !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios)));
