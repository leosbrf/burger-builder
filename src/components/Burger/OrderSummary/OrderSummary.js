import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    //this could be a functional component, does not have to be a classe
    //I changed Modal.js instead, because OrderSummary is a child of Modal
    //then it will not trigger the update lifecycle unless Modal says it.
    componentWillUpdate() {
        //console.log('[Order Summary] WillUpdate');
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            });

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicius burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export default OrderSummary;