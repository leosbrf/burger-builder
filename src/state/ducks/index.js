import { all, takeEvery, takeLatest } from 'redux-saga/effects'
import * as authTypes from './auth/actionTypes'
import * as authSagas from './auth/sagas'
import * as burgerBuilderTypes from './burgerBuilder/actionTypes'
import * as burgerBuilderSagas from './burgerBuilder/sagas'
import * as orderTypes from './order/actionTypes'
import * as orderSagas from './order/sagas'

const authWatchers = [
    takeLatest(authTypes.SIGNIN_REQUESTED, authSagas.signinSaga),
    takeLatest(authTypes.SIGNOUT_START, authSagas.signoutSaga),
    takeEvery(authTypes.AUTH_CHECK_STATE, authSagas.checkStateSaga),
    takeEvery(authTypes.AUTH_CHECK_TIMEOUT, authSagas.checkTimeoutSaga)
    
]

const burgerBuilderWatchers = [
    takeLatest(burgerBuilderTypes.FETCH_INGREDIENTS_START, burgerBuilderSagas.fetchIngredientsSaga)
]

const orderWatchers = [
    takeEvery(orderTypes.FETCH_ORDERS_REQUESTED, orderSagas.fetchOrdersSaga),
    takeLatest(orderTypes.PURCHASE_BURGER_REQUESTED, orderSagas.purchaseBurgerSaga)
]

export default function* rootWatcher() {
    yield all([
        ...authWatchers,
        ...burgerBuilderWatchers,
        ...orderWatchers
    ])
}