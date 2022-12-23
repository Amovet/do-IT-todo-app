import axios from "axios";
import {all, fork, put, takeEvery, takeLatest, call, take, select} from "redux-saga/effects";
import {
    AddAllWorkspaces,
    ADD_WORKSPACE,
    setWorkspace,
    setLoadTrue,
    CleanWorkspaceInfo,
    UPDATE_BOARDS,
    SetEditWorkspaceTitle,
    SetInitWorkspaceTitle,
    SET_WORKSPACE_TITLE,
    SET_WORKSPACE_DESCRIPTION,
    SetInitWorkspaceDescription,
    SetEditWorkspaceDescription,
    ADD_THEME,
    SetTheme,
    SET_CONFIRM,
    deleteWorkspaceInfo,
    CREATE_WORKSPACE,
    setBoards,
    SET_SECRET_WORD, SetSecretKey
} from "../../Workspaces-reducer";

import {DONE, DEVELOPMENT, QUEUE} from "../../../Constants/Constants";
import {
    AddErr, DELETE_SECRET_WORD,
    GET_LINK, SetLink,
    SetRedirectToMain,
    SetRedirectToNewWorkspace,
    SetWindowsViewFalse
} from "../../Settings-reducer";
import {SetStatus, SetTodoStatus, UPDATE_BOARDS_AFTER_CHANGE_STATUS} from "../../Todo-reducer";

export const getName = (state) => state.WorkspaceReducer.Name
export const getDescription = (state) => state.WorkspaceReducer.Description
export const getWorkspaceId = (state) => state.WorkspaceReducer.id
export const getWorkspaceIdFromTodo = (state) => state.TodoReducer.workspaceId
export const getTodoId = (state) => state.TodoReducer.id
export const getWorkspaces = (state) => state.WorkspaceReducer.Workspaces

export function* LoadUserWorkspaces() {
    yield all([fork(workerGetWorkspaces)])
    yield takeEvery(ADD_WORKSPACE, workerSetWorkspace)
    yield takeLatest(UPDATE_BOARDS, workerUpdateBoards)
    yield takeEvery(SET_WORKSPACE_TITLE, workerValidateAndAddWorkspaceName)
    yield takeEvery(SET_WORKSPACE_DESCRIPTION, workerValidateAndAddWorkspaceDescription)
    yield takeLatest(ADD_THEME, workerAddTheme)
    yield takeLatest(SET_CONFIRM, workerDeleteWorkspace)
    yield takeEvery(CREATE_WORKSPACE, workerCreateWorkspace)
    yield takeLatest(UPDATE_BOARDS_AFTER_CHANGE_STATUS, workerUpdateBoardsAfterChangeStatus)
    yield takeEvery(SET_SECRET_WORD, workerSetSecretWord)
    yield takeEvery(GET_LINK, workerGetLink)
    yield takeEvery(DELETE_SECRET_WORD, workerDeleteSecretLink)
}

export function* workerGetWorkspaces() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {
            const data = yield axios.get(`${process.env.REACT_APP_API_URL}/workspace`, config)
            yield put(AddAllWorkspaces(data.data))
        } catch (e) {
            console.log(e)
        }
    } else {
    }

}

export function* workerTodosIdFromBoards(QueueTodo, DevelopmentTodo, DoneTodo) {
    try {
        const Queue = yield call(() => workerSetQueue(QueueTodo))
        const Development = yield  call(() => workerSetDev(DevelopmentTodo))
        const Done = yield call(() => workerSetDone(DoneTodo))
        return [
            {title: QUEUE, items: Queue},
            {title: DEVELOPMENT, items: Development},
            {title: DONE, items: Done}
        ]
    } catch (e) {
        console.log(e)

    }


}

export function* getTodoById(item) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        return yield axios.get(`${process.env.REACT_APP_API_URL}/todo/${item}`, config)
    } catch (e) {
        console.log(e)
    }
}

export function* getCommentId(item) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield axios.get(`${process.env.REACT_APP_API_URL}/all_todo_comment/${item}`, config)
        let comments = yield all(data.data.map(e => call(() => getUserInfo(e, e.user))))
        return comments
    } catch (e) {
        console.log(e)
    }
}

export function* workerSetQueue(Queue) {
    try {
        if (Queue.length > 0) {
            let err = 0
            let value = []
            let data = yield all(Queue.map(item => call(() => workerGetTodoInfoById(value, Queue, err, item))))
            data.forEach(e => {
                if (e !== undefined) {
                    return data = e
                }
            })
            return data
        } else {
            return Queue
        }

    } catch (e) {
        console.log(e)
    }
}

export function* workerSetDev(dev) {
    try {
        if (dev.length > 0) {
            let err = 0
            let value = []
            let data = yield all(dev.map(item => call(() => workerGetTodoInfoById(value, dev, err, item))))
            data.forEach(e => {
                if (e !== undefined) {
                    return data = e
                }
            })
            return data
        } else {
            return dev
        }
    } catch (e) {
        console.log(e)
    }
}

export function* workerSetDone(done) {
    try {
        if (done.length > 0) {
            let err = 0
            let value = []
            let data = yield all(done.map(item => call(() => workerGetTodoInfoById(value, done, err, item))))
            data.forEach(e => {
                if (e !== undefined) {
                    return data = e
                }
            })
            return data
        } else {
            return done
        }
    } catch (e) {
        console.log(e)
    }
}

export function* workerGetTodoInfoById(value, type, err, item) {
    try {

        let data = yield call(() => getTodoById(item))
        if (data.data == []) {
            err++
        } else {
            value.push(...data.data)
        }
        if (value.length == (type.length + err)) {
            return value
        }
    } catch (e) {
        console.log(e)
    }
}

export function* workerSetWorkspace({id}) {
    yield put(setLoadTrue())
    yield put(CleanWorkspaceInfo()) //need to clean before new init

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            //get workspace info (by id) and todos which are inside, by todos id
            let data = yield axios.get(`${process.env.REACT_APP_API_URL}/workspace/${id}`, config)
            data = data.data[0]

            //need rework ....
            let boards = yield call(() => workerTodosIdFromBoards(data.QueueeTodo, data.DevelopmentTodo, data.DoneTodo))

            let background = null //validate background
            let theme = null
            if (data.backgroundImgUrl !== undefined) {
                background = data.backgroundImgUrl
            }
            if (data.theme !== undefined) {
                theme = data.theme
            }

            let shareKey
            if (data.shareKey) {
                shareKey = true
            } else {
                shareKey = false
            }

            let Guest = yield all(data.Guest.map(e => call(() => getUserInfoById(e))))
            let User = yield call(() => getUserInfoById(data.user))
            yield put(setWorkspace(data.title, data.description, data._id, data.createdAt, data.updatedAt, background, boards, theme, Guest, User, shareKey))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUpdateBoards({id, boards}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let Queue = []
        let Development = []
        let Done = []
        //get id for sending to server
        boards.forEach(e => {
            if (e.title == QUEUE && e.items.length > 0) {
                e.items.forEach(
                    todo => {
                        Queue.push(`${todo._id}`)
                    }
                )
            }
            if (e.title == DEVELOPMENT && e.items.length > 0) {
                e.items.forEach(
                    todo => {
                        Development.push(`${todo._id}`)
                    }
                )
            }
            if (e.title == DONE && e.items.length > 0) {
                e.items.forEach(
                    todo => {
                        Done.push(`${todo._id}`)
                    }
                )
            }
        })

        let body = {}

        //Add value for body
        body.QueueeTodo = Queue
        body.DevelopmentTodo = Development
        body.DoneTodo = Done
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${id}`, body, config))
            yield call(() => workerGetWorkspaces())
        } catch (e) {
            console.log(e)

        }
    } else {

    }

}

export function* getUserInfo(item, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield axios.get(`${process.env.REACT_APP_API_URL}/user_info/${id}`, config)
        data.data.userId = id
        item.user = data.data
        return item
    } catch (e) {
        console.log(e)
    }
}

export function* getUserInfoById(id) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield axios.get(`${process.env.REACT_APP_API_URL}/user_info/${id}`, config)
        data.data._id = id
        return data.data
    } catch (e) {
        console.log(e)
    }
}

export function* workerValidateAndAddWorkspaceName() {
    let Name = yield select(getName)
    if (Name == undefined || Name.length < 5) {
        yield put(AddErr("Workspace name must contain more than 5 characters"))
        yield put(SetEditWorkspaceTitle(false))
        yield put(SetInitWorkspaceTitle())
    } else {
        yield call(() => workerUpdateWorkspaceName(Name))
    }

}

export function* workerUpdateWorkspaceName(Name) {
    let id = yield select(getWorkspaceId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {title: Name}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${id}`, body, config))
            yield put(SetEditWorkspaceTitle(false))
            yield call(() => workerGetWorkspaces())
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerValidateAndAddWorkspaceDescription() {
    let Description = yield select(getDescription)
    if (Description == undefined || Description.length < 10) {
        yield put(AddErr("Description must contain more than 10 characters"))
        yield put(SetEditWorkspaceDescription(false))
        yield put(SetInitWorkspaceDescription())
    } else {
        yield call(() => workerUpdateWorkspaceDescription(Description))
    }

}

export function* workerUpdateWorkspaceDescription(Description) {
    let id = yield select(getWorkspaceId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {description: Description}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${id}`, body, config))
            yield put(SetEditWorkspaceDescription(false))
            yield call(() => workerGetWorkspaces())
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerAddTheme({theme}) {
    let id = yield select(getWorkspaceId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {theme: theme}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${id}`, body, config))
            yield put(SetTheme(theme))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerCreateWorkspace({name, description}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {
            title: name,
            description: description
        }
        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/workspace`, body, config))
            yield call(() => workerGetWorkspaces())
            yield put(SetWindowsViewFalse())
            yield put(SetRedirectToNewWorkspace(data.data._id))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerDeleteWorkspace({id}) {
    let AllWorkspaces = yield select(getWorkspaces)

    let newAllWorkspaces = AllWorkspaces.filter(i => {
        return i._id !== id
    })

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            yield call(() => axios.delete(`${process.env.REACT_APP_API_URL}/workspace/${id}`, config))
            yield call(() => axios.delete(`${process.env.REACT_APP_API_URL}/workspace-todos/${id}`, config))
            yield put(deleteWorkspaceInfo(newAllWorkspaces))
            yield put(SetWindowsViewFalse())
            yield put(SetRedirectToMain())
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerUpdateBoardsAfterChangeStatus({board}) {
    if (localStorage.getItem('token')) {
        let workspaces = yield select(getWorkspaces)
        let id = yield select(getTodoId)
        let workspaceId = yield select(getWorkspaceIdFromTodo)
        let body = {}
        workspaces.map((e) => {
            if (e._id == workspaceId) {
                body.QueueeTodo = e.QueueeTodo.filter(i => {
                    return i !== id
                })
                body.DevelopmentTodo = e.DevelopmentTodo.filter(i => {
                    return i !== id
                })
                body.DoneTodo = e.DoneTodo.filter(i => {
                    return i !== id
                })
            }
        })
        if (board == QUEUE) {
            body.QueueeTodo = [...body.QueueeTodo, id];
            board = QUEUE
        }
        if (board == DEVELOPMENT) {
            body.DevelopmentTodo = [...body.DevelopmentTodo, id];
            board = DEVELOPMENT
        }
        if (board == DONE) {
            body.DoneTodo = [...body.DoneTodo, id];
            board = DONE
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${workspaceId}`, body, config))
            yield call(() => workerGetWorkspaces())
            yield put(SetStatus(board, id))
            let boards = yield call(() => workerTodosIdFromBoards(body.QueueeTodo, body.DevelopmentTodo, body.DoneTodo))
            yield put(setBoards(boards))
            yield put(SetTodoStatus(board))
        } catch (e) {
            console.log(e)

        }
    } else {

    }

}

export function* workerSetSecretWord({word}) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            if (word.length < 5) {
                yield put(AddErr("Secret word must contain more than 5 characters"))
            } else {
                let workspaceId = yield select(getWorkspaceId)
                let body = {shareKey: word}
                yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace-set-remote/${workspaceId}`, body, config))
                yield put(SetSecretKey(true))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerGetLink() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            let workspaceId = yield select(getWorkspaceId)
            let data = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/workspace-link/${workspaceId}`, config))
            let shareLink = `${process.env.REACT_APP_REACT}/workspace-follow/${data.data.token}`
            yield put(SetLink(shareLink))


        } catch (e) {
            yield put(AddErr('You don\'t have the rights to do this'))
        }
    }
}

export function* workerDeleteSecretLink() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            let workspaceId = yield select(getWorkspaceId)
            let body = {shareKey: ''}
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/workspace/${workspaceId}`, body, config))
            yield put(SetSecretKey(false))
            yield put(SetLink(''))


        } catch (e) {
            console.log(e)
        }
    }
}