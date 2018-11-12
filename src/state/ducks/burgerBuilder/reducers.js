import * as types from './actionTypes'
import createReducer from '../../utils/createReducer'

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

const burgerBuilderReducer = createReducer(initialState)({
    [types.SET_INGREDIENTS]: (state, action) => ({
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
    }),
    
    [types.FETCH_INGREDIENTS_FAILED]: (state, action) => ({
        ...state,
        ingredients: [],
        error: true,
        building: false
    }),

    [types.ADD_INGREDIENT]: (state, action) => ({
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }),

    [types.REMOVE_INGREDIENT]: (state, action) => ({
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }),
})

export default burgerBuilderReducer