import * as actionTypes from '../actions/actionTypes'
const lodash=require('lodash')
const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false

}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const addIngredient =(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.ingredients[action.ingredientName]=state.ingredients[action.ingredientName]+1
    stateCopy.totalPrice=state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    stateCopy.building=true
    return stateCopy
}


const removeIngredient=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.ingredients[action.ingredientName]=state.ingredients[action.ingredientName]-1
    stateCopy.totalPrice=state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    stateCopy.building=true
    return stateCopy
    // return {
    //     ...state,
    //     ingredients:{
    //         ...state.ingredients,
    //         [action.ingredientName]:state.ingredients[action.ingredientName]-1
    //     }
    // }
}


const setIngredients=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.ingredients={
        salad:action.ingredients.salad,
        bacon:action.ingredients.bacon,
        cheese:action.ingredients.cheese,
        meat:action.ingredients.meat
    }
    stateCopy.totalPrice=4
    stateCopy.error=false;
    stateCopy.building=false
    return stateCopy
}


const fetchIngredientsFailed=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.error=true
    return stateCopy;
}


const reducer =(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)

        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action)

        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action)

        case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action)

        default:
            return state;
    }
}
export default reducer