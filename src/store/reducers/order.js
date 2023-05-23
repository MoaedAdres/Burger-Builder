import * as actionTypes from '../actions/actionTypes';
import lodash from 'lodash'
const initialState ={
    orders:[],
    loading:false,
    purchased:false
}

const purchaseInit=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.purchased=false
    return stateCopy
}

const purchaseBurgerStart =(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.loading=true;
    return stateCopy;
}


const purchaseBurgerSuccess=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    const newOrder={
        ...action.orderData,
        id:action.orderId,
    }
    stateCopy.orders.push(newOrder)
    stateCopy.loading=false;
    stateCopy.purchased=true
    return stateCopy
}


const purchaseBurgerFail=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.loading=false
    return stateCopy   
}


const fetchOrderStart=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.loading=true
    return stateCopy
}


const fetchOrderSuccess=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.loading=false;
    stateCopy.orders=action.orders;
    return stateCopy
}


const fetchOrderFail=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.loading=false
    return stateCopy
}
const reducer=(state=initialState,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action)

        case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state,action)

        case actionTypes.PURCHASE_BURGER_SUCCESS:return purchaseBurgerSuccess(state,action)

        case actionTypes.PURCHASE_BURGER_FAIL:return purchaseBurgerFail(state,action)

        case actionTypes.FETCH_ORDER_START:return fetchOrderStart(state,action)

        case actionTypes.FETCH_ORDER_SUCCESS:return fetchOrderSuccess(state,action)

        case actionTypes.FETCH_ORDER_FAIL:return fetchOrderFail(state,action)

        default:
            return stateCopy
    }
}
export default reducer