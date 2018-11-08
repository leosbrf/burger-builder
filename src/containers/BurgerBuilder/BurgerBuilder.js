import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

//The export was also added here for unit testing purposes
export class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    isPurchasable(ingredients) {
        if (!ingredients) return false;
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        const { history, isAuthenticated, onSetAuthRedirectPath } = this.props

        if (isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            onSetAuthRedirectPath('/checkout')
            history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

        //handled by redux
        // const params = [];
        // for (let i in this.props.ingredients) {
        //     params.push(
        //         encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }

        // params.push('price=' + this.state.totalPrice);
        // const queryString = params.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
    }

    render() {

        const { ingredients, totalPrice, isAuthenticated } = this.props;

        const disabledInfo = {
            ...ingredients
        };

        for (const key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        const purchasable = this.isPurchasable(ingredients);

        if (ingredients && Object.keys(ingredients).length > 0) {
            burger =
                <React.Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        isAuthenticated={isAuthenticated}
                        ingredientAdded={(type) => this.props.onAddIngredient(type)}
                        ingredientRemoved={(type) => this.props.onRemoveIngredient(type)}
                        disable={disabledInfo}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                        price={totalPrice} />
                </React.Fragment>

            orderSummary =
                <OrderSummary
                    ingredients={ingredients}
                    price={totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onGetIngredientsSuccess: (ingredients) => dispatch({ type: actions.GET_INGREDIENTS_SUCCESS, payload: { ingredients: ingredients } }),
        // onGetIngredientsError: () => dispatch({ type: actions.GET_INGREDIENTS_ERROR, payload: { error: true } }),
        onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onRemoveIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);