import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START 
    }
}

export const authSuccess=(userId,idToken)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        userId:userId,
        idToken:idToken
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return  dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000)
    }
}

export const auth=(email,password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        //signup in api
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdPfSNOnBmp778pHqz68aL1qnKDZafNz0'

        //sign in
        if(!isSignUp){
             url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdPfSNOnBmp778pHqz68aL1qnKDZafNz0'
        }

        axios.post(url,authData)
        .then(response=>{
            console.log(response.data.expiresIn)
            const expirationDate=new Date(new Date().getTime() + response.data.expiresIn * 1000)            
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.localId,response.data.idToken))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error=>{
            console.log(error.response.data.error)
            dispatch(authFail(error.response.data.error))
        })
    }
}


export const setAuthRedirectPath=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }

}

export const authCheckState=()=>{
    return dispatch =>{
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate=new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            } else {
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(userId,token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}