import axios from "axios";
import {select, put, takeEvery, takeLatest, call} from "redux-saga/effects";
import {
    setWorkspace,
    UpdateBoards
} from "../../Workspaces-reducer";
import {
    ADD_COMMENT,
    CREATE_TODO,
    DELETE_COMMENT, DELETE_FILES,
    DELETE_SUBTASK, DELETE_TODO,
    DeleteInitTodo, GET_ALL_TODO, GET_UPCOMING_TODO,
    OPEN_TODO,
    PUT_SUBTASK_TITLE,
    SET_STATUS,
    SET_SUBTASK_CHECKED, SetAllTodo,
    SetComment,
    SetDescriptionNull,
    SetEditDescription, SetEditPriority,
    SetEditSubtask,
    SetEditTitle, SetEndTime, SetFiles,
    SetPrevTitle, SetPriority,
    SetTodoInfo, SetUpcomingTodo,
    TODO_SUBTASK_VALIDATION,
    TODO_TITLE_UPDATE,
    TODO_TITLE_VALIDATION, UPDATE_END_DATE, UPDATE_IMPORTANCE,
    UpdateComment,
    UpdateSubtask, UPLOAD_FILES
} from "../../Todo-reducer";
import {
    AddErr,
    SetLoadingAllTodo,
    SetLoadingUpcomingTodo,
    SetWindowsViewFalse,
    SetWindowsViewTrue
} from "../../Settings-reducer";
import {getCommentId, getTodoById, getUserInfo, workerTodosIdFromBoards} from "../workspaces/workspaces";
import {ADD_TODO_WINDOW, TODO_UPDATE_DESCRIPTION} from "../../../Constants/Constants";

export const getInitTitle = (state) => state.TodoReducer.initNewTodo.title
export const getTitle = (state) => state.TodoReducer.title
export const getDescription = (state) => state.TodoReducer.description
export const getFiles = (state) => state.TodoReducer.filesUrl
export const getId = (state) => state.TodoReducer.id
export const getStatus = (state) => state.TodoReducer.status
export const getInitStatus = (state) => state.TodoReducer.initNewTodo.status
export const getBoards = (state) => state.WorkspaceReducer.Boards
export const getWorkspaceId = (state) => state.WorkspaceReducer.id
export const getWorkspaceIdFromTodo = (state) => state.TodoReducer.workspaceId
export const getAdded = (state) => state.TodoReducer.initNewTodo.added
export const getSubtasks = (state) => state.TodoReducer.subtasks
export const getComment = (state) => state.TodoReducer.comments
export const getAllTodo = (state) => state.TodoReducer.allTodo
export const getUpcomingTodo = (state) => state.TodoReducer.upcomingTodo


export function* WatcherTodos() {
    yield takeLatest(CREATE_TODO, workerAddTodo)
    yield takeEvery(TODO_TITLE_VALIDATION, workerValidateAndAddTodo)
    yield takeEvery(TODO_UPDATE_DESCRIPTION, workerValidateAndAddDescription)
    yield takeEvery(OPEN_TODO, workerOpenTodo)
    yield takeEvery(SET_STATUS, workerSetTodoStatus)
    yield takeEvery(PUT_SUBTASK_TITLE, workerPutSubtask)
    yield takeEvery(TODO_SUBTASK_VALIDATION, workerValidateAndAddSubtask)
    yield takeEvery(SET_SUBTASK_CHECKED, workerAddSubtaskChecked)
    yield takeEvery(DELETE_SUBTASK, workerDeleteSubtask)
    yield takeEvery(DELETE_COMMENT, workerDeleteComment)
    yield takeEvery(ADD_COMMENT, workerAddComment)
    yield takeEvery(TODO_TITLE_UPDATE, workerUpdateTodoTitle)
    yield takeEvery(DELETE_TODO, workerDeleteTodo)
    yield takeEvery(UPDATE_END_DATE, workerUpdateDate)
    yield takeEvery(UPDATE_IMPORTANCE, workerUpdatePriority)
    yield takeEvery(UPLOAD_FILES, workerValidateFiles)
    yield takeEvery(DELETE_FILES, workerDeleteFiles)
    yield takeEvery(GET_ALL_TODO, workerGetAllTodo)
    yield takeEvery(GET_UPCOMING_TODO, workerGetUpcomingTodo)

}

export function* workerDeleteFiles({elem}) {
    let FilesNow = yield select(getFiles)
    let files = FilesNow.filter(i => {
        return i !== elem
    })
    yield call(() => workerUpdateFilesUrl(files))


}

export function* workerValidateFiles({files}) {
    if (localStorage.getItem('token')) {
        let FilesAmountNow = yield select(getFiles)
        FilesAmountNow = FilesAmountNow.length
        let filesIsValid = true
        let filesSizeIsValid = true

        if (files.length + FilesAmountNow > 5) {
            filesIsValid = false
        } else {
            files.forEach((e) => {
                if (e.size > 10000000) {
                    return filesSizeIsValid = false
                }
            })
        }
        if (filesIsValid && filesSizeIsValid) {
            yield call(() => workerUploadFiles(files))
        } else {
            if (!filesSizeIsValid) {
                yield put(AddErr("Maximum file size - 10 mb"))
            }
            if (!filesIsValid) {
                yield put(AddErr("Maximum number of files is 5"))
            }
        }
    }

}

export function* workerUploadFiles(files) {
    if (localStorage.getItem('token')) {
        let FilesNow = yield select(getFiles)
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let form = new FormData();
        for (let i = 0; i < files.length; i++) {
            form.append('files', files[i])
        }
        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/upload`, form, config))
            let urls = data.data.url
            yield call(() => workerUpdateFilesUrl([...FilesNow, ...urls]))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUpdateFilesUrl(urls) {
    let id = yield select(getId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {filesUrl: urls}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
            yield put(SetFiles(urls))

        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUpdateDate({date}) {
    let id = yield select(getId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {endTime: date}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
            yield put(SetEndTime(date))

        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerUpdatePriority({priority}) {
    let id = yield select(getId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {importance: priority}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
            yield put(SetPriority(priority))
            yield put(SetEditPriority(false))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerValidateAndAddDescription() {
    let workspaceId = yield select(getWorkspaceId)
    let description = yield select(getDescription)
    let workspaceIdFromTodo = yield select(getWorkspaceIdFromTodo)
    let id = yield select(getId)

    if (description == undefined || description.length < 10) {
        yield put(AddErr("Todo description must contain more than 10 characters"))
        yield put(SetEditDescription(false))
        yield put(SetDescriptionNull())
    } else {
        if (workspaceIdFromTodo !== workspaceId) {
            let allTodo = yield select(getAllTodo)
            let upcomingTodo = yield select(getUpcomingTodo)

            allTodo.map(e => {
                if (e._id == id) {
                    e.description = description
                }
            })
            upcomingTodo.map(e => {
                if (e._id == id) {
                    e.description = description
                }
            })

            yield put(SetAllTodo(allTodo))
            yield put(SetUpcomingTodo(upcomingTodo))
        }

        yield call(() => workerUpdateDescription(description))
    }

}

export function* workerUpdateTodoTitle() {
    let workspaceId = yield select(getWorkspaceId)
    let workspaceIdFromTodo = yield select(getWorkspaceIdFromTodo)
    let title = yield select(getTitle)
    let id = yield select(getId)

    if (title.length < 5) {
        yield put(AddErr("Todo must contain more than 5 characters"))
        yield put(SetEditTitle(false))
        yield put(SetPrevTitle())
    } else {

        if (workspaceIdFromTodo == workspaceId) {
            let boards = yield select(getBoards)
            let status = yield select(getStatus)
            boards.map((board) => {
                if (board.title == status) {
                    board.items.map((e) => {
                        if (e._id == id) {
                            e.title = title
                        }
                    })
                }
            })
            yield put(UpdateBoards(workspaceId, boards))
        } else {
            let allTodo = yield select(getAllTodo)
            let upcomingTodo = yield select(getUpcomingTodo)

            upcomingTodo.map(e => {
                if (e._id == id) {
                    e.title = title
                }
            })
            allTodo.map(e => {
                if (e._id == id) {
                    e.title = title
                }
            })

            yield put(SetAllTodo(allTodo))
            yield put(SetUpcomingTodo(upcomingTodo))
        }
        yield call(() => workerUpdateTitle(id, title))

    }


}

export function* workerUpdateTitle(id, title) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {
            title: title
        }
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
            yield put(SetEditTitle(false))

        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerAddSubtaskChecked({id}) {

    let AllSubtask = yield select(getSubtasks)
    let isDone
    AllSubtask.forEach(e => {
        if (e._id == id) {
            e.isDone = !e.isDone
            isDone = !e.isDone
        }
    })

    yield call(() => workerUpdateSubtaskStatus(AllSubtask, !isDone, id))


}

export function* workerDeleteTodo() {

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let id = yield select(getId)
        let boards = yield select(getBoards)
        let status = yield select(getStatus)
        let workspaceId = yield select(getWorkspaceId)
        boards.map((board) => {
            if (board.title == status) {
                let newSubtasks = board.items.filter(i => {
                    return i._id !== id
                })
                board.items = newSubtasks
            }
        })
        try {
            yield call(() => axios.delete(`${process.env.REACT_APP_API_URL}/todo/${id}`, config))
            yield put(UpdateBoards(workspaceId, boards))
            yield put(SetWindowsViewFalse())
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerDeleteSubtask({id}) {

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let AllSubtask = yield select(getSubtasks)

        let newSubtasks = AllSubtask.filter(i => {
            return i._id !== id
        })
        try {
            yield call(() => axios.delete(`${process.env.REACT_APP_API_URL}/side_todo/${id}`, config))
            yield put(UpdateSubtask(newSubtasks))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerDeleteComment({id}) {

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let AllComment = yield select(getComment)

        let newComments = AllComment.filter(i => {
            return i._id !== id
        })
        try {
            yield call(() => axios.delete(`${process.env.REACT_APP_API_URL}/comment/${id}`, config))
            yield put(UpdateComment(newComments))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerUpdateSubtaskStatus(AllSubtask, isDone, id) {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        let body = {
            isDone: `${isDone}`
        }
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/side_todo/${id}`, body, config))
            yield put(UpdateSubtask(AllSubtask))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerUpdateSubtask(subtask, AllSubtask) {
    let id = yield select(getId)
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        let body = {
            title: subtask.title,
            isDone: 'false',
            todoID: subtask.todoID
        }
        try {
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/side_todo`, body, config))

            let newSubtasks = AllSubtask.filter(i => {
                return i._id !== '000'
            })
            newSubtasks = [{
                _id: data.data._id,
                title: subtask.title,
                isDone: 'false',
                todoID: subtask.todoID
            }, ...newSubtasks]
            yield put(UpdateSubtask(newSubtasks))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerValidateAndAddSubtask({id}) {
    let AllSubtask = yield select(getSubtasks)
    let subtask
    AllSubtask.forEach(e => e._id == id ? subtask = e : null)
    if (subtask.title == undefined || subtask.title.length < 5) {
        let newSubtasks = AllSubtask.filter(i => {
            return i._id !== id
        })
        yield put(AddErr("Subtask must contain more than 5 characters"))
        yield put(SetEditSubtask(false, newSubtasks))
    } else {

        yield call(() => workerUpdateSubtask(subtask, AllSubtask))
    }

}

export function* workerPutSubtask({title, id}) {
    let subtasks = yield select(getSubtasks)
    subtasks.forEach(e => {
        if (e._id == id) {
            e.title = title
        }
    })
    yield put(UpdateSubtask(subtasks))
}

export function* workerUpdateDescription(description) {
    let id = yield select(getId)

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        let body = {description: description}
        try {
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
            yield put(SetEditDescription(false))

        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerValidateAndAddTodo() {
    let InitTitle = yield select(getInitTitle)
    let boards = yield select(getBoards)
    let workspaceId = yield select(getWorkspaceId)
    let InitStatus = yield select(getInitStatus)
    if (InitTitle.length < 5) {
        yield put(AddErr("Todo must contain more than 5 characters"))
        yield put(DeleteInitTodo())
        boards.map((board) => {
            if (board.title == InitStatus) {
                let newItems = board.items.filter(i => {
                    return i._id !== '000'
                })
                board.items = newItems
            }
        })
        yield put(UpdateBoards(workspaceId, boards))

    } else {
        yield call(() => workerAddTodoToServer())
    }

}

export function* workerAddTodoToServer() {
    let added = yield select(getAdded)
    let title = yield select(getTitle)
    let status = yield select(getStatus)
    let InitTitle = yield select(getInitTitle)
    let InitStatus = yield select(getInitStatus)
    let boards = yield select(getBoards)
    let workspaceId = yield select(getWorkspaceId)
    let id = yield select(getId)

    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        let body = {
            title: added ? InitTitle : title,
            status: added ? InitStatus : status,
            workspacesId: workspaceId,
            isDone: "false"
        }

        try {


            // post new todo
            let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/todo`, body, config))
            data = data.data
            // get todo id
            if (data._id) {
                boards.map((board) => {
                    if (board.title == (added ? InitStatus : status)) {
                        let newItems = board.items.filter(i => {
                            let filterId = added ? '000' : id
                            return i._id !== filterId
                        })
                        board.items = newItems
                        boards[boards.indexOf(board)] = {
                            ...board,
                            items: [...board.items, {
                                _id: data._id,
                                isDone: "false",
                                status: added ? InitStatus : status,
                                title: added ? InitTitle : title,
                            }]
                        }
                    }
                })
            }
            if (added == false) {
                yield put(SetEditTitle(false))
            }
            yield put(UpdateBoards(workspaceId, boards))
            yield put(DeleteInitTodo())
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerAddTodo() {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };

        try {
            //get workspace info (by id) and todos which are inside, by todos id
            let data = yield axios.get(`${process.env.REACT_APP_API_URL}/workspace/todo`, config)
            data = data.data[0]

            //need rework ....
            let boards = yield call(() => workerTodosIdFromBoards(data.QueueeTodo, data.DevelopmentTodo, data.DoneTodo))


            let background = null //validate background
            if (data.backgroundImgUrl !== undefined) {
                background = data.backgroundImgUrl
            }
            yield put(setWorkspace(data.title, data.description, data._id, data.createdAt, data.updatedAt, background, boards))
        } catch (e) {
            console.log(e)
        }
    }
}

export function* workerOpenTodo({id}) {

    try {
        let todo = yield call(() => getTodoById(id))
        let subtasks = yield call(() => CheckSubtasks(id))
        todo = todo.data[0]
        let comments = yield call(() => getCommentId(id))
        yield put(SetTodoInfo(todo._id, todo.title, todo.description, todo.endTime, todo.importance, todo.filesUrl, todo.status, todo.isDone, todo.createdAt, subtasks, comments, todo.workspacesId))
        yield put(SetWindowsViewTrue(ADD_TODO_WINDOW))
    } catch (e) {
        console.log(e)
    }

}

export function* workerSetTodoStatus({status, id}) {
    let changeFromWindows = false
    if (id == undefined) {
        id = yield select(getId)
        changeFromWindows = true
    }
    if (localStorage.getItem('token')) {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        };

        try {
            let body = {status: status}
            yield call(() => axios.patch(`${process.env.REACT_APP_API_URL}/todo/${id}`, body, config))
        } catch (e) {
            console.log(e)
        }
    }

}

export function* CheckSubtasks(item) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield axios.get(`${process.env.REACT_APP_API_URL}/side_todo/${item}`, config)
        return data.data
    } catch (e) {
        console.log(e)
    }
}

export function* workerAddComment({text}) {
    if (localStorage.getItem('token')) {
        let workspaceId = yield select(getId)
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        };
        try {
            let body = {
                text: text,
                todoID: workspaceId
            }

            if (text.length < 5) {
                yield put(AddErr("Comments must contain more than 5 characters"))
            } else {
                let data = yield call(() => axios.post(`${process.env.REACT_APP_API_URL}/comment`, body, config))
                let newComments = yield call(() => getUserInfo(data.data, data.data.user))
                yield put(SetComment(newComments))
            }

        } catch (e) {
            console.log(e)
        }
    }

}

export function* workerGetAllTodo() {
    yield put(SetLoadingAllTodo(true))
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/todo`, config))
        yield put(SetAllTodo(data.data))
        yield put(SetLoadingAllTodo(false))
    } catch (e) {
        console.log(e)
    }

}

export function* workerGetUpcomingTodo({SortType}) {
    yield put(SetLoadingUpcomingTodo(true))
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        let data = yield call(() => axios.get(`${process.env.REACT_APP_API_URL}/todo/upcoming/${SortType}`, config))
        yield put(SetUpcomingTodo(data.data))
        yield put(SetLoadingUpcomingTodo(false))
    } catch (e) {
        console.log(e)
    }

}