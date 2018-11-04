import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        //better way is to pass the authentication token automatically in an axios interceptor
        axios.post(`/orders.json?auth=${getState().auth.idToken}`, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFailed(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (userId) => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart())
        //better way is to pass the authentication token automatically in an axios interceptor
        const queryParams = `?auth=${getState().auth.idToken}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`/orders.json${queryParams}`)
            .then(response => {
                const fetchedOrders = [];
                for (const key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        const order = response.data[key];
                        fetchedOrders.push({
                            ...order,
                            id: key
                        });
                    }
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            })
    }
}