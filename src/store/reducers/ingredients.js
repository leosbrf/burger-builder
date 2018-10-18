import * as actions from "../actions";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: [],
    totalPrice: 4,
    error: false
}

const ingredients = (state = initialState, action) => {

    let newState = { ...state };

    switch (action.type) {
        case actions.GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                error: false
            }
        case actions.GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredients: [],
                error: true
            }

        case actions.ADD_INGREDIENT:
            newState = addIngredient(state, action.payload);
            return newState;

        case actions.REMOVE_INGREDIENT:
            newState = removeIngredient(state, action.payload);
            return newState;

        default:
            break;
    }
    return state;
}

const addIngredient = (state, payload) => {
    const type = payload.ingredientType;

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [type]: state.ingredients[type] + 1
        },
        totalPrice:  state.totalPrice + INGREDIENT_PRICES[type]
    }
}

const removeIngredient = (state, payload) => {
    const type = payload.ingredientType;

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [type]: state.ingredients[type] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[type]
    }
}

export default ingredients;
