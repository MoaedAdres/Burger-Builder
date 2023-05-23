import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const PurchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const PurchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const PurchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const PurchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(PurchaseBurgerStart());

        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response)
                dispatch(PurchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(PurchaseBurgerFail(error))
            });
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams='?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch((error) => {
                dispatch(fetchOrderFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
