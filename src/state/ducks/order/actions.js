import * as types from './actionTypes'

export const purchaseInit = () => ({ type: types.PURCHASE_INIT })

export const fetchOrdersRequested = (userId) => ({ type: types.FETCH_ORDERS_REQUESTED, userId })
export const fetchOrdersStart = () => ({ type: types.FETCH_ORDERS_START })
export const fetchOrdersSuccess = (orders) => ({ type: types.FETCH_ORDERS_SUCCESS, orders: orders })
export const fetchOrdersFailed = (error) => ({ type: types.FETCH_ORDERS_FAILED, error: error })

export const purchaseBurgerRequested = (orderData) => ({ type: types.PURCHASE_BURGER_REQUESTED, orderData: orderData })
export const purchaseBurgerStart = () => ({ type: types.PURCHASE_BURGER_START })
export const purchaseBurgerSuccess = (id, orderData) => ({ type: types.PURCHASE_BURGER_SUCCESS, orderId: id, orderData: orderData })
export const purchaseBurgerFailed = (error) => ({ type: types.PURCHASE_BURGER_FAILED, error: error })

