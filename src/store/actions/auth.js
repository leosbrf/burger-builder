import * as actionTypes from "./actionTypes";
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    //there is a better approach. Don't put logic in your object action creators
    //instead create a function action creator. i.e: onLogout
    localStorage.removeItem('idToken')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const apiKey = null //firebase API key
        
        if (!apiKey)
            console.error('No API key was set');
        

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`

        if (!isSignup) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('idToken', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })

    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken')
        if (!idToken) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(idToken, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}