import axios from '../../../axios-orders'
import { select, call, put } from 'redux-saga/effects'
import { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFailed, fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailed } from './actions'

const getidToken = state => state.auth.idToken

export function* purchaseBurgerSaga({ orderData }) {
    try {
        yield put(purchaseBurgerStart())
        //better way is to pass the authentication token automatically in an axios interceptor
        const idToken = yield select(getidToken)

        const { data } = yield call(axios.post, `/orders.json?auth=${idToken}`, orderData)
        yield put(purchaseBurgerSuccess(data.name, orderData));
    } catch (error) {
        yield put(purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga({ userId }) {
    try {
        yield put(fetchOrdersStart())
        //better way is to pass the authentication token automatically in an axios interceptor
        const idToken = yield select(getidToken)
        const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
        const { data } = yield call(axios.get, `/orders.json${queryParams}`)
        const fetchedOrders = []
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const order = data[key]
                fetchedOrders.push({
                    ...order,
                    id: key
                })
            }
        }
        yield put(fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(fetchOrdersFailed(error))
    }
}