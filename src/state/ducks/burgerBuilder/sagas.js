import axios from '../../../axios-orders'
import { call, put } from "redux-saga/effects"
import { setIngredients, fetchIngredientsFailed } from "./actions"

export function* fetchIngredientsSaga() {
    try {
        const { data } = yield call(axios.get, '/ingredients.json')
        yield put(setIngredients(data));
    } catch (error) {
        yield put(fetchIngredientsFailed());
    }
}