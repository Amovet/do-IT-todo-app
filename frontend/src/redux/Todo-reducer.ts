import {TODO_UPDATE_DESCRIPTION} from "../Constants/Constants";

export const SET_TODO = 'SET_TODO';
export const SET_ALL_TODO = 'SET_ALL_TODO';
export const GET_ALL_TODO = 'GET_ALL_TODO';
export const SET_TODO_STATUS = 'SET_TODO_STATUS';
export const SET_FILES = 'SET_FILES';
export const UPLOAD_FILES = 'UPLOAD_FILES';
export const SET_INIT_STATUS = 'SET_INIT_STATUS';
export const CREATE_TODO = 'CREATE_TODO';
export const SET_INIT_TITLE = 'SET_INIT_TITLE';
export const SET_INIT_TODO = 'SET_INIT_TODO';
export const DELETE_INIT_TODO = 'DELETE_INIT_TODO';
export const TODO_TITLE_VALIDATION = 'TODO_TITLE_VALIDATION';
export const TODO_SUBTASK_VALIDATION = 'TODO_SUBTASK_VALIDATION';
export const TODO_UPDATE_SUBTASK = 'TODO_UPDATE_SUBTASK';
export const OPEN_TODO = 'OPEN_TODO';
export const SET_STATUS = 'SET_STATUS';
export const DELETE_SUBTASK = 'DELETE_SUBTASK';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_DESCRIPTION_NULL = 'SET_DESCRIPTION_NULL';
export const SET_PREV_TITLE = 'SET_PREV_TITLE';
export const TODO_TITLE_UPDATE = 'TODO_TITLE_UPDATE';
export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_EDIT_END_DATE_FALSE = 'SET_EDIT_END_DATE_FALSE';
export const DELETE_FILES = 'DELETE_FILES';
export const SET_EDIT_STATUS = 'SET_EDIT_STATUS';
export const UPDATE_BOARDS_AFTER_CHANGE_STATUS = 'UPDATE_BOARDS_AFTER_CHANGE_STATUS';
export const GET_UPCOMING_TODO = 'GET_UPCOMING_TODO';
export const SET_UPCOMING_TODO = 'SET_UPCOMING_TODO';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_SUBTASK = 'UPDATE_SUBTASK';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_EDIT_TITLE = 'SET_EDIT_TITLE';
export const SET_EDIT_DESCRIPTION = 'SET_EDIT_DESCRIPTION';
export const SET_EDIT_SUBTASKS = 'SET_EDIT_SUBTASKS';
export const SET_EDIT_IMPORTANCE = 'SET_EDIT_IMPORTANCE';
export const SET_IMPORTANCE = 'SET_IMPORTANCE';
export const UPDATE_IMPORTANCE = 'UPDATE_IMPORTANCE';
export const ADD_NEW_SUBTASK = 'ADD_NEW_SUBTASK';
export const PUT_SUBTASK_TITLE = 'PUT_SUBTASK_TITLE';
export const SET_SUBTASK_CHECKED = 'SET_SUBTASK_CHECKED';


export interface InitNewTodo {
    title: string | null,
    added: boolean,
    status: string | null,
    _id: '000'
}

export interface EditValues {
    editTitle: boolean,
    editDescription: boolean,
    editStatus: boolean,
    editComments: boolean,
    editDataEnd: boolean,
    editImportance: boolean,
    editFiles: boolean,
    editIsDone: boolean,
    editSubtask: boolean
}

export interface TodoInitialState {
    id: string | null,
    title: string | null,
    description: string | null,
    endTime: string | null,
    importance: string | null,
    filesUrl: Array<string> | null,
    status: string | null,
    workspaceId: string | null,
    isDone: boolean | null
    createdAt: string | null,
    subtasks: any,
    comments: any,
    initNewTodo: InitNewTodo,
    EditTodo: EditValues,
    prevTitle: string | null,
    allTodo: Array<object | null>
    upcomingTodo: Array<object | null>,
}

let initialState: TodoInitialState =
    {
        id: null,
        title: '',
        description: null,
        endTime: null,
        importance: null,
        filesUrl: null,
        status: null,
        workspaceId: null,
        isDone: null,
        createdAt: null,
        subtasks: [],
        comments: [],
        prevTitle: '',
        initNewTodo: {
            title: '',
            added: false,
            status: null,
            _id: '000'
        },
        EditTodo: {
            editTitle: false,
            editDescription: false,
            editStatus: false,
            editComments: false,
            editDataEnd: false,
            editImportance: false,
            editFiles: false,
            editIsDone: false,
            editSubtask: false
        },
        allTodo: [],
        upcomingTodo: [],
    };


const TodoReducer = (state = initialState, action: IActions) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                id: action.id,
                title: action.title,
                description: action.description,
                endTime: action.endTime,
                importance: action.importance,
                workspaceId: action.workspaceId,
                filesUrl: action.filesUrl,
                status: action.status,
                isDone: action.isDone,
                createdAt: action.createdAt,
                subtasks: action.subtasks,
                comments: action.comments,
                prevTitle: action.title,
            }
        case SET_INIT_TITLE:
            return {
                ...state,
                initNewTodo: {
                    ...state.initNewTodo,
                    title: action.title
                },
            }
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case SET_FILES:
            return {
                ...state,
                filesUrl: action.files,
            }
        case SET_IMPORTANCE:
            return {
                ...state,
                importance: action.priority,
            }
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.description
            }
        case SET_TODO_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_INIT_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case DELETE_INIT_TODO:
            return {
                ...state,
                initNewTodo: {
                    ...initialState.initNewTodo,
                },
            }
        case SET_EDIT_TITLE:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editTitle: action.value
                }
            }
        case UPDATE_END_DATE:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editDataEnd: true
                }

            }
        case UPDATE_IMPORTANCE:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editImportance: true
                }

            }
        case SET_EDIT_DESCRIPTION:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editDescription: action.value
                }
            }
        case SET_DESCRIPTION_NULL:
            return {
                ...state,
                description: action.description

            }
        case SET_PREV_TITLE:
            return {
                ...state,
                title: state.prevTitle
            }
        case SET_END_DATE:
            return {
                ...state,
                endTime: action.date,
                EditTodo: {
                    ...state.EditTodo,
                    editDataEnd: false
                }
            }
        case SET_IMPORTANCE:
            return {
                ...state,
                importance: action.priority,
                EditTodo: {
                    ...state.EditTodo,
                    editImportance: false
                }
            }
        case SET_EDIT_END_DATE_FALSE:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editDataEnd: false
                }
            }
        case SET_EDIT_IMPORTANCE:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editImportance: action.priority
                }
            }
        case SET_EDIT_STATUS:
            return {
                ...state,
                EditTodo: {
                    ...state.EditTodo,
                    editStatus: action.value
                }
            }
        case ADD_NEW_SUBTASK:
            return {
                ...state,
                subtasks: [{_id: action._id, title: '', todoID: action.todoID}, ...state.subtasks],
            }
        case SET_EDIT_SUBTASKS:
            return {
                ...state,
                subtasks: action.subtasks,
                EditTodo: {
                    ...state.EditTodo,
                    editSubtask: action.value,
                }
            }
        case UPDATE_SUBTASK:
            return {
                ...state,
                subtasks: action.subtasks
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: action.comments
            }
        case SET_COMMENT:
            return {
                ...state,
                comments: [action.comments,...state.comments]
            }
        case SET_ALL_TODO:
            return {
                ...state,
                allTodo: action.allTodo
            }
        case SET_UPCOMING_TODO:
            return {
                ...state,
                upcomingTodo: action.upcomingTodo
            }
        case SET_INIT_TODO:
            return {
                ...state,
                initNewTodo: {
                    ...state.initNewTodo,
                    added: true,
                    AddTitle: false,
                    status: action.status
                },

            }


        default:
            return state;
    }
}


type IActions = ISetEditTitle | ISetEditDescription | ISetEditSubtask | IUpdateTitle | IUpdateSubtask |
    IUpdateDescription | ISetStatus | ISetUpdateDescription | IDeleteFiles | ISetTodoInfo | ISetInitStatus |
    ISetInitTitle | ITodoTitleValidation | ITodoTitleUpdate | ITodoSubtaskValidation | ISetInitTodo |
    IDeleteInitTodo | IOpenTodo | IaddNewSubtask | IputSubtaskTitleInState | ISetCheckedSubtask | IDeleteSubtask |
    IDeleteComment | IDeleteTodo | IAddComment | ISetComment | IUpdateComment | ISetDescriptionNull | ISetPrevTitle |
    IUpdateEndTime | ISetEndTime | ISetEditEndDateFalse | IUpdatePriority | ISetPriority | ISetEditPriority |
    ISetEditStatus | IUploadFiles | ISetFiles | IUpdateBoardsAfterChangeStatus | ISetTodoStatus | ISetAllTodo |
    IGetAllTodo | IGetUpcomingTodo | ISetUpcomingTodo


export interface ISetEditTitle {
    type: typeof SET_EDIT_TITLE,
    value: boolean
}

export const SetEditTitle = (value: boolean): ISetEditTitle => {
    return {
        type: SET_EDIT_TITLE,
        value
    }
}

export interface ISetEditDescription {
    type: typeof SET_EDIT_DESCRIPTION,
    value: boolean
}

export const SetEditDescription = (value: boolean): ISetEditDescription => {
    return {
        type: SET_EDIT_DESCRIPTION,
        value
    }
}

export interface ISetEditSubtask {
    type: typeof SET_EDIT_SUBTASKS,
    value: boolean,
    subtasks: object
}

export const SetEditSubtask = (value: boolean, subtasks: object): ISetEditSubtask => {

    return {
        type: SET_EDIT_SUBTASKS,
        value,
        subtasks
    }
}

export interface IUpdateTitle {
    type: typeof UPDATE_TITLE,
    title: string
}

export const UpdateTitle = (title: string): IUpdateTitle => {
    return {
        type: UPDATE_TITLE,
        title
    }
}

export interface IUpdateSubtask {
    type: typeof UPDATE_SUBTASK,
    subtasks: string
}

export const UpdateSubtask = (subtasks: string): IUpdateSubtask => {
    return {
        type: UPDATE_SUBTASK,
        subtasks
    }
}

export interface IUpdateDescription {
    type: typeof UPDATE_DESCRIPTION,
    description: string
}

export const UpdateDescription = (description: string): IUpdateDescription => {
    return {
        type: UPDATE_DESCRIPTION,
        description
    }
}

export interface ISetStatus {
    type: typeof SET_STATUS,
    status: string,
    id: string
}

export const SetStatus = (status: string, id: string): ISetStatus => {
    return {
        type: SET_STATUS,
        status,
        id
    }
}

export interface ISetUpdateDescription {
    type: typeof TODO_UPDATE_DESCRIPTION,
}

export const SetUpdateDescription = (): ISetUpdateDescription => {
    return {
        type: TODO_UPDATE_DESCRIPTION,
    }
}

export interface IDeleteFiles {
    type: typeof DELETE_FILES,
    elem: string
}

export const DeleteFiles = (elem: string): IDeleteFiles => {
    return {
        type: DELETE_FILES,
        elem
    }
}

export interface ISetTodoInfo {
    type: typeof SET_TODO,
    id: string,
    title: string,
    description: string | undefined,
    endTime: string | undefined,
    importance: string | undefined,
    filesUrl: Array<string> | undefined,
    status: string,
    isDone: string | undefined,
    createdAt: string | undefined,
    subtasks: any,
    comments: any,
    workspaceId: string
}

export const SetTodoInfo = (id: string, title: string, description: string | undefined,
                            endTime: string | undefined, importance: string | undefined,
                            filesUrl: Array<string> | undefined, status: string, isDone: string | undefined,
                            createdAt: string | undefined, subtasks: any, comments: any, workspaceId: string): ISetTodoInfo => {
    return {
        type: SET_TODO,
        id,
        title,
        description,
        endTime,
        importance,
        filesUrl,
        status,
        isDone,
        createdAt,
        subtasks,
        comments,
        workspaceId
    }
}

export interface ISetInitStatus {
    type: typeof SET_INIT_STATUS,
    status: string
}

export const SetInitStatus = (status: string): ISetInitStatus => {
    return {
        type: SET_INIT_STATUS,
        status
    }
}

export interface ISetInitTitle {
    type: typeof SET_INIT_TITLE,
    title: string
}

export const SetInitTitle = (title: string): ISetInitTitle => {
    return {
        type: SET_INIT_TITLE,
        title
    }
}

export interface ITodoTitleValidation {
    type: typeof TODO_TITLE_VALIDATION,
}

export const TodoTitleValidation = (): ITodoTitleValidation => {
    return {
        type: TODO_TITLE_VALIDATION,
    }
}

export interface ITodoTitleUpdate {
    type: typeof TODO_TITLE_UPDATE,
}

export const TodoTitleUpdate = (): ITodoTitleUpdate => {
    return {
        type: TODO_TITLE_UPDATE,
    }
}

export interface ITodoSubtaskValidation {
    type: typeof TODO_SUBTASK_VALIDATION,
    id: string
}

export const TodoSubtaskValidation = (id: string): ITodoSubtaskValidation => {
    return {
        type: TODO_SUBTASK_VALIDATION,
        id
    }
}

export interface ISetInitTodo {
    type: typeof SET_INIT_TODO,
    status: string
}

export const SetInitTodo = (status: string): ISetInitTodo => {
    return {
        type: SET_INIT_TODO,
        status
    }
}

export interface IDeleteInitTodo {
    type: typeof DELETE_INIT_TODO
}

export const DeleteInitTodo = (): IDeleteInitTodo => {
    return {
        type: DELETE_INIT_TODO,
    }
}

export interface IOpenTodo {
    type: typeof OPEN_TODO,
    id: number
}

export const OpenTodo = (id: number): IOpenTodo => {
    return {
        type: OPEN_TODO,
        id
    }
}

export interface IaddNewSubtask {
    type: typeof ADD_NEW_SUBTASK,
    todoID: number,
    _id: '000'
}

export const addNewSubtask = (todoID: number): IaddNewSubtask => {
    return {
        type: ADD_NEW_SUBTASK,
        todoID,
        _id: '000'
    }
}

export interface IputSubtaskTitleInState {
    type: typeof PUT_SUBTASK_TITLE,
    title: string,
    id: string
}

export const putSubtaskTitleInState = (title: string, id: string): IputSubtaskTitleInState => {
    return {
        type: PUT_SUBTASK_TITLE,
        title,
        id
    }
}

export interface ISetCheckedSubtask {
    type: typeof SET_SUBTASK_CHECKED,
    id: string
}

export const SetCheckedSubtask = (id: string): ISetCheckedSubtask => {
    return {
        type: SET_SUBTASK_CHECKED,
        id,
    }
}

export interface IDeleteSubtask {
    type: typeof DELETE_SUBTASK,
    id: string
}

export const DeleteSubtask = (id: string): IDeleteSubtask => {
    return {
        type: DELETE_SUBTASK,
        id,
    }
}

export interface IDeleteComment {
    type: typeof DELETE_COMMENT,
    id: string
}

export const DeleteComment = (id: string): IDeleteComment => {
    return {
        type: DELETE_COMMENT,
        id,
    }
}

export interface IDeleteTodo {
    type: typeof DELETE_TODO,
}

export const DeleteTodo = (): IDeleteTodo => {
    return {
        type: DELETE_TODO,
    }
}

export interface IAddComment {
    type: typeof ADD_COMMENT,
    text: string
}

export const AddComment = (text: string): IAddComment => {
    return {
        type: ADD_COMMENT,
        text,
    }
}

export interface ISetComment {
    type: typeof SET_COMMENT,
    comments: any
}

export const SetComment = (comments: any): ISetComment => {
    return {
        type: SET_COMMENT,
        comments,
    }
}

export interface IUpdateComment {
    type: typeof UPDATE_COMMENT,
    comments: any
}

export const UpdateComment = (comments: any): IUpdateComment => {
    return {
        type: UPDATE_COMMENT,
        comments,
    }
}

export interface ISetDescriptionNull {
    type: typeof SET_DESCRIPTION_NULL,
    description: '',
}

export const SetDescriptionNull = (): ISetDescriptionNull => {
    return {
        type: SET_DESCRIPTION_NULL,
        description: '',
    }
}

export interface ISetPrevTitle {
    type: typeof SET_PREV_TITLE,
}

export const SetPrevTitle = (): ISetPrevTitle => {
    return {
        type: SET_PREV_TITLE,
    }
}

export interface IUpdateEndTime {
    type: typeof UPDATE_END_DATE,
    date: string
}

export const UpdateEndTime = (date: string): IUpdateEndTime => {
    return {
        type: UPDATE_END_DATE,
        date
    }
}

export interface ISetEndTime {
    type: typeof SET_END_DATE,
    date: string
}

export const SetEndTime = (date: string): ISetEndTime => {
    return {
        type: SET_END_DATE,
        date
    }
}

export interface ISetEditEndDateFalse {
    type: typeof SET_EDIT_END_DATE_FALSE,
}

export const SetEditEndDateFalse = (): ISetEditEndDateFalse => {
    return {
        type: SET_EDIT_END_DATE_FALSE,
    }
}

export interface IUpdatePriority {
    type: typeof UPDATE_IMPORTANCE,
    priority: string
}

export const UpdatePriority = (priority: string): IUpdatePriority => {
    return {
        type: UPDATE_IMPORTANCE,
        priority
    }
}

export interface ISetPriority {
    type: typeof SET_IMPORTANCE,
    priority: string
}

export const SetPriority = (priority: string): ISetPriority => {
    return {
        type: SET_IMPORTANCE,
        priority
    }
}

export interface ISetEditPriority {
    type: typeof SET_EDIT_IMPORTANCE,
    priority: boolean
}

export const SetEditPriority = (priority: boolean): ISetEditPriority => {
    return {
        type: SET_EDIT_IMPORTANCE,
        priority
    }
}

export interface ISetEditStatus {
    type: typeof SET_EDIT_STATUS,
    value: boolean
}

export const SetEditStatus = (value: boolean): ISetEditStatus => {
    return {
        type: SET_EDIT_STATUS,
        value
    }
}

export interface IUploadFiles {
    type: typeof UPLOAD_FILES,
    files: any
}

export const UploadFiles = (files: any): IUploadFiles => {
    return {
        type: UPLOAD_FILES,
        files
    }
}

export interface ISetFiles {
    type: typeof SET_FILES,
    files: any
}

export const SetFiles = (files: any): ISetFiles => {
    return {
        type: SET_FILES,
        files
    }
}

export interface IUpdateBoardsAfterChangeStatus {
    type: typeof UPDATE_BOARDS_AFTER_CHANGE_STATUS,
    board: string
}

export const UpdateBoardsAfterChangeStatus = (board: string): IUpdateBoardsAfterChangeStatus => {
    return {
        type: UPDATE_BOARDS_AFTER_CHANGE_STATUS,
        board
    }
}

export interface ISetTodoStatus {
    type: typeof SET_TODO_STATUS,
    status: string
}

export const SetTodoStatus = (status: string) => {
    return {
        type: SET_TODO_STATUS,
        status
    }
}

export interface ISetAllTodo {
    type: typeof SET_ALL_TODO,
    allTodo: Array<object>
}

export const SetAllTodo = (allTodo: Array<object>): ISetAllTodo => {
    return {
        type: SET_ALL_TODO,
        allTodo
    }
}

export interface IGetAllTodo {
    type: typeof GET_ALL_TODO,
}

export const GetAllTodo = (): IGetAllTodo => {
    return {
        type: GET_ALL_TODO,
    }
}

export interface IGetUpcomingTodo {
    type: typeof GET_UPCOMING_TODO,
    SortType: string
}

export const GetUpcomingTodo = (SortType: string): IGetUpcomingTodo => {
    return {
        type: GET_UPCOMING_TODO,
        SortType
    }
}

export interface ISetUpcomingTodo {
    type: typeof SET_UPCOMING_TODO,
    upcomingTodo: Array<object>
}

export const SetUpcomingTodo = (upcomingTodo: Array<object>): ISetUpcomingTodo => {
    return {
        type: SET_UPCOMING_TODO,
        upcomingTodo
    }
}


export default TodoReducer;