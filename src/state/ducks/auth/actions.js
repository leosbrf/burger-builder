import * as types from "./actionTypes"

export const signinRequested = (email, password, isSignup) => ({ type: types.SIGNIN_REQUESTED, email, password, isSignup })
export const signinStart = () => ({ type: types.SIGNIN_START })
export const signinSuccess = (idToken, userId) => ({ type: types.SIGNIN_SUCCESS, idToken, userId })
export const signinFail = (error) => ({ type: types.SIGNIN_FAIL, error })

export const signoutStart = () => ({ type: types.SIGNOUT_START })

export const checkTimeout = (expiresIn) => ({ type: types.AUTH_CHECK_TIMEOUT, expiresIn })
export const checkState = () => ({ type: types.AUTH_CHECK_STATE })
export const redirectPath = (path) => ({ type: types.AUTH_SET_REDIRECT_PATH, path })