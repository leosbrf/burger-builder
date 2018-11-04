import * as actions from "../actions/actionTypes";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false,
    building: false
}

const ingredients = (state = initialState, action) => {

    let newState = { ...state };

    switch (action.type) {
        case actions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            }
        case actions.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredients: [],
                error: true,
                building: false
            }

        case actions.ADD_INGREDIENT:
            newState = addIngredient(state, action.ingredientName);
            return newState;

        case actions.REMOVE_INGREDIENT:
            newState = removeIngredient(state, action.ingredientName);
            return newState;

        default:
            break;
    }
    return state;
}

const addIngredient = (state, ingredientName) => {

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        building: true
    }
}

const removeIngredient = (state, ingredientName) => {

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
        building: true
    }
}

export default ingredients;
