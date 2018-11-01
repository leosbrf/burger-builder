import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    //handled by redux
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             /*o sinal + é usado aqui para transformar a 
    //             string em número*/
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }

    //     this.setState({ ingredients: ingredients, totalPrice: price });

    // }

    checkoutCancelledHandler() {
        this.props.history.goBack();
    }

    checkoutContinuedHandler() {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const { ingredients, purchased } = this.props;

        let summary = <Redirect to='/' />

        if (ingredients && Object.keys(ingredients).length > 0) {
            const purchasedRedirect = purchased
                ? <Redirect to='/' />
                : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={ingredients}
                        checkoutCancelled={() => this.checkoutCancelledHandler()}
                        checkoutContinued={() => this.checkoutContinuedHandler()} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})


export default connect(mapStateToProps)(Checkout);