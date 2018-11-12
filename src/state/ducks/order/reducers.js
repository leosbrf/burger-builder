import * as types from './actionTypes'
import createReducer from '../../utils/createReducer';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


const orderReducer = createReducer(initialState)({
    [types.PURCHASE_INIT]: (state, action) => ({ ...state, purchased: false }),
    [types.PURCHASE_BURGER_START]: (state, action) => ({ ...state, loading: true }),
    [types.PURCHASE_BURGER_SUCCESS]: (state, action) => ({ ...state, loading: false, purchased: true, orders: state.orders.concat({ ...action.orderData, id: action.orderId }) }),
    [types.PURCHASE_BURGER_FAILED]: (state, action) => ({ ...state, loading: false }),
    [types.FETCH_ORDERS_START]: (state, action) => ({...state, loading: true}),
    [types.FETCH_ORDERS_SUCCESS]: (state, action) => ({...state,orders: action.orders,loading: false}),
    [types.FETCH_ORDERS_FAILED]: (state, action) => ({...state, loading: false})
})

export default orderReducer