import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import * as authActions from '../../../state/ducks/auth/actions'

class Logout extends Component {

    componentDidMount() {
        this.props.onSignout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignout: () => dispatch(authActions.signoutStart())
    }
}


export default connect(null, mapDispatchToProps)(Logout);
