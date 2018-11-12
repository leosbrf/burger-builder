import * as types from "./actionTypes"

export const addIngredient = (name) => ({ type: types.ADD_INGREDIENT, ingredientName: name })
export const removeIngredient = (name) => ({ type: types.REMOVE_INGREDIENT, ingredientName: name })
export const setIngredients = (ingredients) => ({ type: types.SET_INGREDIENTS, ingredients })
export const fetchIngredientsStart = () => ({ type: types.FETCH_INGREDIENTS_START })
export const fetchIngredientsFailed = () => ({ type: types.FETCH_INGREDIENTS_FAILED })