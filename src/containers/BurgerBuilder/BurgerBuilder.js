import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from 'components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.props.onGetIngredientsSuccess(response.data);
            })
            .catch((error) => {
                this.props.onGetIngredientsError();
            });
    }

    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    addIngredientHandler = (type) => {
        this.props.onAddIngredient(type);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        this.props.onRemoveIngredient(type);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //this.props.history.push('/checkout');
        const params = [];
        for (let i in this.props.ingredients) {
            params.push(
                encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }

        params.push('price=' + this.state.totalPrice);
        const queryString = params.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {

        const { ingredients, totalPrice } = this.props;

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

        if (ingredients) {
            burger =
                <React.Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
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

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

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

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = dispatch => {
    return {
        onGetIngredientsSuccess: (ingredients) => dispatch({ type: actions.GET_INGREDIENTS_SUCCESS, payload: { ingredients: ingredients } }),
        onGetIngredientsError: () => dispatch({ type: actions.GET_INGREDIENTS_ERROR, payload: { error: true } }),
        onAddIngredient: (ingredientType) => dispatch({ type: actions.ADD_INGREDIENT, payload: { ingredientType } }),
        onRemoveIngredient: (ingredientType) => dispatch({ type: actions.REMOVE_INGREDIENT, payload: { ingredientType } })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));