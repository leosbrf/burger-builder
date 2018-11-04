import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../../store/actions";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'shipest', displayValue: 'Shipest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const { ingredients, totalPrice, userId, onOrderBurger } = this.props

        const formData = {};
        for (const formElement in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(formElement)) {
                formData[formElement] = this.state.orderForm[formElement].value;
            }
        }
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: formData,
            userId: userId
        }

        onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules)
            return isValid;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedhandler = (event, inputIdentifier) => {

        //shallow copy of all order form elements
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        //get the formElement being changed
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        //set the value the user input
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        //put the changed value of formElement into the shallow copy of orderForm
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (const key in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(key)) {
                formIsValid = updatedOrderForm[key].valid && formIsValid;
            }
        }

        //update the state in an immuttable way
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {

        const formsElementArray = [];
        for (const field in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(field)) {
                const fieldConfig = this.state.orderForm[field];
                formsElementArray.push({
                    id: field,
                    config: fieldConfig
                })
            }
        }

        let form = (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formsElementArray.map(formElement => {
                        return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(e) => this.inputChangedhandler(e, formElement.id)} />
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </div>
        );

        if (this.props.loading) {
            form = <Spinner />
        }
        return (form);
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));