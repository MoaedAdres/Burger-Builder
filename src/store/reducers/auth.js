import * as actionTypes from '../actions/actionTypes'
import lodash from 'lodash'
const initialState = {
    userId: null,
    idToken: null,
    error: null,
    loading: null,
    authRedirectPath:'/'
}
const authStart = (state, action) => {
    const stateCopy = lodash.cloneDeep(state)
    stateCopy.error = null
    stateCopy.loading = true
    return stateCopy
}

const authSuccess = (state,action)=>{
    const stateCopy =lodash.cloneDeep(state)
    stateCopy.error=null
    stateCopy.loading=false
    stateCopy.userId=action.userId
    stateCopy.idToken=action.idToken
    return stateCopy
}
const authFail = (state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.error=action.error
    stateCopy.loading=false
    return stateCopy
}

const authLogout=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.idToken=null
    stateCopy.userId=null
    return stateCopy
}

const setAuthRedirectPath=(state,action)=>{
    const stateCopy=lodash.cloneDeep(state)
    stateCopy.authRedirectPath=action.path
    return stateCopy
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state,action)
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action)
        case actionTypes.AUTH_FAIL: return authFail(state,action)
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action)
        default: return state
    }
};

export default reducer