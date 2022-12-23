import axios from "axios";
import {put, takeLatest, delay, select, call} from "redux-saga/effects";
import {
    ADD_ERR,
    SetErr,
    ClearErr,
    AddErr,
    SEARCH_TODO,
    SetResulLoading,
    SetResult,
    FOLLOW_WORKSPACE, SetRedirectToFollowWorkspace
} from "../../Settings-reducer";
import {
    SELECT_BACKGROUND, SelectBackground, SetBackground,
    UPLOAD_BACKGROUND
} from "../../Workspaces-reducer";
import {getWorkspaceId} from "../workspaces/workspaces";
import {getFiles} from "../todos/todos";
import {
    DELETE_USER_PHOTO,
    SetEmail,
    SetName,
    SetUserPhoto,
    UPDATE_EMAIL,
    UPDATE_NAME,
    UPLOAD_USER_PHOTO
} from "../../Auth-reducer";

export function* SettingsWatcher() {
    yield takeLatest(ADD_ERR, workerAddErr)
    yield takeLatest(UPLOAD_BACKGROUND, workerValidateAndAddWorkspaceBackground)
    yield takeLatest(UPLOAD_USER_PHOTO, workerValidateAndAddUserPhoto)
    yield takeLatest(SELECT_BACKGROUND, workerUpdateWorkspaceBackground)
    yield takeLatest(SEARCH_TODO, workerSearch)
    yield takeLatest(DELETE_USER_PHOTO, workerDeleteUserPhoto)
    yield takeLatest(UPDATE_NAME, workerUpdateName)
    yield takeLatest(UPDATE_EMAIL, workerUpdateEmail)
    yield takeLatest(FOLLOW_WORKSPACE, workerFollowWorkspace)
}


export function* workerAddErr({Err}) {
    yield put(SetErr(Err))
    yield delay(2500)
    yield put(ClearErr())
}


export function* workerValidateAndAddWorkspaceBackground({files}) {
    let filesTypeIsValid = true
    let filesSizeIsValid = true
    if (files[0].name.slice(-3) !== 'jpg') {
        yield put(AddErr("Invalid file type"))
        filesTypeIsValid = false
    }
    if (files[0].size > 10000000) {
        yield put(AddErr("Maximum file size - 10 mb"))
        filesSizeIsValid = false
    }
    if (filesSizeIsValid && filesTypeIsValid) {
        yield call(() => workerUploadBackground(files))
    }

}

export function* workerValidateAndAddUserPhoto({files}) {
    let filesTypeIsValid = true
    let filesSizeIsValid = true
    if (files[0].name.slice(-3) !== 'jpg') {
        yield put(AddErr("Invalid file type"))
        filesTypeIsValid = false
    }
    if (files[0].size > 10000000) {
        yield put(AddErr("Maximum file size - 10 mb"))
        filesSizeIsValid = false
    }
    if (filesSizeIsValid && filesTypeIsValid) {
        yield call(() => workerUploadUserPhoto(files))
    }

}

export function* workerUploadUserPhoto(files) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let form = new FormData();
        form.append('files', files[0])

        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/upload`, form, config))
            let urls = `${process.env.REACT_APP_API_URL}`.concat(...data.data.url)
            let body = {avatarUrl: urls}
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/user_info`, body, config))
            yield put(SetUserPhoto(urls))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerDeleteUserPhoto() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {avatarUrl: ''}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/user_info`, body, config))
            yield put(SetUserPhoto(''))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUploadBackground(files) {
    if (localStorage.getItem('token')) {
        let FilesNow = yield select(getFiles)
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let form = new FormData();
        form.append('files', files[0])

        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/upload`, form, config))
            let urls = `${process.env.REACT_APP_API_URL}`.concat(...data.data.url)
            yield put(SelectBackground(urls))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUpdateWorkspaceBackground({files}) {
    let id = yield select(getWorkspaceId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {backgroundImgUrl: files}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${id}`, body, config))
            yield put(SetBackground(files))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerSearch({value}) {

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {
            if (value.length > 2) {
                yield put(SetResulLoading(true))
                let data = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/search/${value}`, config))
                yield put(SetResult(data.data))
                yield put(SetResulLoading(false))
            } else {
                yield put(SetResult([]))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerUpdateName({name}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        if (name.length < 5) {
            yield put(AddErr("Minimum number of characters 5"))
        } else {
            let body = {fullName: name}
            try {
                yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/user_info`, body, config))
                yield put(SetName(name))
                yield put(AddErr("Name updated successfully"))
            } catch (e) {
                console.log(e)
            }
        }
    }

}

export function* workerUpdateEmail({email}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {email: email}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/user_info`, body, config))
            yield put(SetEmail(email))
            yield put(AddErr("Email updated successfully"))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerFollowWorkspace({secretWord, token}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {shareKey: secretWord}
        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/workspace-remote/${token}`, body, config))
            if (data.data.own) {
                yield put(AddErr('You are trying to add your own workspace'))
            } else {
                yield put(SetRedirectToFollowWorkspace(data.data.workspace))
            }
        } catch (e) {
            yield put(AddErr("Invalid secret word"))
        }
    }

}