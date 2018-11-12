import axios from 'axios'
import { delay } from "redux-saga"
import { call, put } from "redux-saga/effects"
import { signinSuccess, signinFail, checkTimeout, signoutStart, signinStart } from "./actions"

export function* signinSaga({ email, password, isSignup }) {
    try {

        yield put(signinStart())

        const authData = { email, password, returnSecureToken: true }
        const apiKey = 'AIzaSyCR_MslgmLNtVSi3gKhaUQ53ro1JEVXt8A' //firebase API key
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        if (!isSignup) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`
        }

        const { data } = yield call(axios.post, url, authData)

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('idToken', data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', data.localId)

        yield put(signinSuccess(data.idToken, data.localId))
        yield put(checkTimeout(data.expiresIn))

    } catch (error) {
        yield put(signinFail(error.response.data.error))
    }
}

export function* checkStateSaga() {
    const idToken = localStorage.getItem('idToken')
    if (!idToken) {
        yield put(signoutStart())
        return;
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
        yield put(signoutStart())
    } else {
        const userId = localStorage.getItem('userId')
        yield put(signinSuccess(idToken, userId))
        yield put(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
}

export function* checkTimeoutSaga({ expirationTime }) {
    yield delay(expirationTime * 1000, signoutStart())
}

export function* signoutSaga() {
    yield localStorage.removeItem('idToken')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
}