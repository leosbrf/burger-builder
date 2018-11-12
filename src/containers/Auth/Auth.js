import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import * as authActions from '../../state/ducks/auth/actions'
import { checkValidity } from "../../shared/utility";


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    componentDidMount() {
        const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props

        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }

    inputChangedhandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onSignin(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {

        const { loading, error, isAuthenticated, authRedirectPath } = this.props

        let form = <Spinner />

        let errorMessage = null
        if (error) {
            errorMessage = <p>{error.message}</p>
        }

        if (isAuthenticated) {           
            return <Redirect to={authRedirectPath} />
        }

        if (!loading) {
            const formsElementArray = [];
            for (const field in this.state.controls) {
                if (this.state.controls.hasOwnProperty(field)) {
                    const fieldConfig = this.state.controls[field];
                    formsElementArray.push({
                        id: field,
                        config: fieldConfig
                    })
                }
            }

            form = formsElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(e) => this.inputChangedhandler(e, formElement.id)} />

            ))
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">{!this.state.isSignup ? 'SWITCH TO SIGNUP' : 'SWITCH TO SIGNIN'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSignin: (email, password, isSignup) => dispatch(authActions.signinRequested(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(authActions.redirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)