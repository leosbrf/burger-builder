import * as types from "./actionTypes"
import createReducer from "../../utils/createReducer"

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = createReducer(initialState)({
    [types.SIGNIN_START]: (state, action) => ({ ...state, error: null, loading: true }),
    [types.SIGNIN_SUCCESS]: (state, action) => ({ ...state, idToken: action.idToken, userId: action.userId, error: null, loading: false }),
    [types.SIGNIN_FAIL]: (state, action) => ({ ...state, error: action.error, loading: false }),
    [types.SIGNOUT_START]: (state, action) => ({ ...state, idToken: null, userId: null }),
    [types.AUTH_SET_REDIRECT_PATH]: (state, action) => ({ ...state, authRedirectPath: action.path })
})

export default authReducer