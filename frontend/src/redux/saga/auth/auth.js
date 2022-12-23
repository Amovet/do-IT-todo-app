import axios from "axios";
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    AUTHENTICATED_FAIL,
    CHECK_AUTHENTICATED,
    LOAD_USER_FAIL,
    loadUser,
    LOGIN,
    LOGOUT, LOGOUT_SUCCESS,
    SIGNUP
} from "../../Auth-reducer";
import {workerGetWorkspaces} from "../workspaces/workspaces";
import {AddErr} from "../../Settings-reducer";

export function* AuthAndLoadUserInfo() {
    yield all([takeEvery(CHECK_AUTHENTICATED, workerAuth)])
    yield takeEvery(LOGIN, workerLogin)
    yield takeEvery(LOGOUT, workerLogout)
    yield takeEvery(SIGNUP, workerSignup)
}

export function* workerAuth() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {

            const data = yield axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, config)
            yield put(loadUser(data.data, localStorage.getItem('token')))
        } catch (e) {
            yield put({type: AUTHENTICATED_FAIL})
        }
    } else {
        yield put({type: AUTHENTICATED_FAIL})
    }

}

export function* workerLogin({email, password}) {
    const body = {
        email: `${email}`,
        password: `${password}`
    }

    try {
        const data = yield axios.post(` ${process.env.REACT_APP_API_URL}/auth/login`, body)
        localStorage.setItem('token', data.data.token)
        yield put(loadUser(data.data, data.data.token))
        yield call(() => workerGetWorkspaces())
    } catch (e) {
        yield put({type: LOAD_USER_FAIL})
        yield put(AddErr("Invalid username or password"))
    }

}

export function* workerLogout() {
    yield put({type: LOGOUT_SUCCESS})
}

export function* workerSignup({fullName, email, password}) {
    const body = {
        fullName: `${fullName}`,
        email: `${email}`,
        password: `${password}`
    }
    try {
        const data = yield axios.post(` ${process.env.REACT_APP_API_URL}/auth/register`, body)
        localStorage.setItem('token', data.data.token)
        yield put(loadUser(data.data, data.data.token))
        yield call(() => workerGetWorkspaces())
    } catch (e) {
        yield put({type: LOAD_USER_FAIL})
        yield put(AddErr("Signup fail"))

    }

}
