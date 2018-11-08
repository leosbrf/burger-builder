import reducer from "./auth"
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {

    const initialState = {
        idToken: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token and userid upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            ...initialState,
            idToken: 'some-token',
            userId: 'some-user-id'
        })
    })
})