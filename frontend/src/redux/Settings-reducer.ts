import {SET_NAME} from "./Auth-reducer";

export const SET_WINDOW_TRUE = 'SET_WINDOW_TRUE';
export const SET_WINDOW_FALSE = 'SET_WINDOW_FALSE';
export const CLEAR_ERR = 'CLEAR_ERR';
export const SET_ERR = 'SET_ERR';
export const ADD_ERR = 'ADD_ERR';
export const GET_LINK = 'GET_LINK';
export const SET_LINK = 'SET_LINK';
export const DELETE_LINK = 'DELETE_LINK';
export const SEARCH_TODO = 'SEARCH_TODO';
export const SET_RESULT = 'SET_RESULT';
export const SET_RESULT_LOAD = 'SET_RESULT_LOAD';
export const SET_REDIRECT_TO_MAIN = 'SET_REDIRECT_TO_MAIN';
export const SET_REDIRECT_TO_MAIN_FALSE = 'SET_REDIRECT_TO_MAIN_FALSE';
export const SET_REDIRECT_TO_NEW_WORKSPACE = 'SET_REDIRECT_TO_NEW_WORKSPACE';
export const SET_REDIRECT_TO_NEW_WORKSPACE_FALSE = 'SET_REDIRECT_TO_NEW_WORKSPACE_FALSE';
export const SET_LOADING_ALL_TODO = 'SET_LOADING_ALL_TODO';
export const SET_LOADING_UPCOMING_TODO = 'SET_LOADING_UPCOMING_TODO';
export const DELETE_SECRET_WORD = 'DELETE_SECRET_WORD';
export const FOLLOW_WORKSPACE = 'FOLLOW_WORKSPACE';
export const REDIRECT_TO_FOLLOW_WORKSPACE = 'REDIRECT_TO_FOLLOW_WORKSPACE';


interface initialState {
    WindowView: boolean,
    WindowType: string | null,
    Err: string | null,
    RedirectToMain: boolean,
    RedirectToNewWorkspace: string | null,
    LoadingAllTodo: boolean,
    LoadingUpcomingTodo: boolean
    LoadingSearchTodo: boolean,
    SearchResult: Array<any>,
    ShareLink: string,
    RedirectToFollowWorkspace: null | string
}

let initialState: initialState =
    {
        WindowView: false,
        WindowType: null,
        Err: null,
        RedirectToMain: false,
        RedirectToNewWorkspace: null,
        LoadingAllTodo: false,
        LoadingUpcomingTodo: false,
        LoadingSearchTodo: false,
        SearchResult: [],
        ShareLink: '',
        RedirectToFollowWorkspace: null,
    };


const SettingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_WINDOW_FALSE:
            return {
                ...state,
                WindowView: false,
                WindowType: null,
                ShareLink: ''
            }
        case SET_WINDOW_TRUE:
            return {
                ...state,
                WindowView: true,
                WindowType: action.WindowType
            }
        case SET_ERR:
            return {
                ...state,
                Err: action.Err
            }
        case SET_REDIRECT_TO_MAIN:
            return {
                ...state,
                RedirectToMain: true
            }
        case SET_REDIRECT_TO_MAIN_FALSE:
            return {
                ...state,
                RedirectToMain: false
            }
        case SET_REDIRECT_TO_NEW_WORKSPACE:
            return {
                ...state,
                RedirectToNewWorkspace: action.id
            }
        case SET_REDIRECT_TO_NEW_WORKSPACE_FALSE:
            return {
                ...state,
                RedirectToNewWorkspace: null
            }
        case SET_LOADING_ALL_TODO:
            return {
                ...state,
                LoadingAllTodo: action.value
            }
        case SET_LOADING_UPCOMING_TODO:
            return {
                ...state,
                LoadingUpcomingTodo: action.value
            }
        case CLEAR_ERR:
            return {
                ...state,
                Err: null
            }
        case SEARCH_TODO:
            return {
                ...state,
            }
        case SET_RESULT_LOAD:
            return {
                ...state,
                LoadingSearchTodo: action.value
            }
        case SET_RESULT:
            return {
                ...state,
                SearchResult: action.value,
            }
        case DELETE_LINK:
            return {
                ...state,
                ShareLink: ''
            }
        case SET_LINK:
            return {
                ...state,
                ShareLink: action.link
            }
        case REDIRECT_TO_FOLLOW_WORKSPACE:
            return {
                ...state,
                RedirectToFollowWorkspace: action.value
            }
        default:
            return state;
    }
}


export interface ISetWindowsViewTrue {
    type: typeof SET_WINDOW_TRUE,
    WindowType: string
}

export const SetWindowsViewTrue = (WindowType: string): ISetWindowsViewTrue => {
    return {
        type: SET_WINDOW_TRUE,
        WindowType,

    }
}

export interface ISetWindowsViewFalse {
    type: typeof SET_WINDOW_FALSE,
}

export const SetWindowsViewFalse = (): ISetWindowsViewFalse => {
    return {
        type: SET_WINDOW_FALSE,
    }
}

export interface ISetErr {
    type: typeof SET_ERR,
    Err: string
}

export const SetErr = (Err: string): ISetErr => {
    return {
        type: SET_ERR,
        Err,
    }
}

export interface IClearErr {
    type: typeof CLEAR_ERR,
}

export const ClearErr = (): IClearErr => {
    return {
        type: CLEAR_ERR,
    }
}

export interface IAddErr {
    type: typeof ADD_ERR,
    Err: string
}

export const AddErr = (Err: string): IAddErr => {
    return {
        type: ADD_ERR,
        Err,
    }
}

export interface ISetRedirectToMain {
    type: typeof SET_REDIRECT_TO_MAIN,
}

export const SetRedirectToMain = (): ISetRedirectToMain => {
    return {
        type: SET_REDIRECT_TO_MAIN,
    }
}

export interface ISetRedirectToMainFalse {
    type: typeof SET_REDIRECT_TO_MAIN_FALSE,
}

export const SetRedirectToMainFalse = (): ISetRedirectToMainFalse => {
    return {
        type: SET_REDIRECT_TO_MAIN_FALSE,
    }
}

export interface ISetRedirectToNewWorkspace {
    type: typeof SET_REDIRECT_TO_NEW_WORKSPACE,
    id: string
}

export const SetRedirectToNewWorkspace = (id: string): ISetRedirectToNewWorkspace => {
    return {
        type: SET_REDIRECT_TO_NEW_WORKSPACE,
        id
    }
}

export interface ISetRedirectToNewWorkspaceFalse {
    type: typeof SET_REDIRECT_TO_NEW_WORKSPACE_FALSE,
}

export const SetRedirectToNewWorkspaceFalse = () => {
    return {
        type: SET_REDIRECT_TO_NEW_WORKSPACE_FALSE,
    }
}

export interface ISetLoadingAllTodo {
    type: typeof SET_LOADING_ALL_TODO,
    value: boolean
}

export const SetLoadingAllTodo = (value: boolean): ISetLoadingAllTodo => {
    return {
        type: SET_LOADING_ALL_TODO,
        value
    }
}

export interface ISetLoadingUpcomingTodo {
    type: typeof SET_LOADING_UPCOMING_TODO,
    value: boolean
}

export const SetLoadingUpcomingTodo = (value: boolean): ISetLoadingUpcomingTodo => {
    return {
        type: SET_LOADING_UPCOMING_TODO,
        value
    }
}

export interface ISearchTodo {
    type: typeof SEARCH_TODO,
    value: string
}

export const SearchTodo = (value: string): ISearchTodo => {
    return {
        type: SEARCH_TODO,
        value
    }
}

export interface ISetResulLoading {
    type: typeof SET_RESULT_LOAD,
    value: boolean
}

export const SetResulLoading = (value: boolean): ISetResulLoading => {
    return {
        type: SET_RESULT_LOAD,
        value
    }
}

export interface ISetResult {
    type: typeof SET_RESULT,
    value: Array<object>
}

export const SetResult = (value: Array<object>): ISetResult => {
    return {
        type: SET_RESULT,
        value
    }
}

export interface IGetLink {
    type: typeof GET_LINK,
}

export const GetLink = (): IGetLink => {
    return {
        type: GET_LINK,
    }
}

export interface ISetLink {
    type: typeof SET_LINK,
    link: string
}

export const SetLink = (link: string): ISetLink => {
    return {
        type: SET_LINK,
        link
    }
}

export interface IDeleteSecretWord {
    type: typeof DELETE_SECRET_WORD,
}

export const DeleteSecretWord = (): IDeleteSecretWord => {
    return {
        type: DELETE_SECRET_WORD,
    }
}

export interface IFollowWorkspace {
    type: typeof FOLLOW_WORKSPACE,
    secretWord: string,
    token: string
}

export const FollowWorkspace = (secretWord: string, token: string): IFollowWorkspace => {
    return {
        type: FOLLOW_WORKSPACE,
        secretWord,
        token
    }
}

export interface ISetRedirectToFollowWorkspace {
    type: typeof REDIRECT_TO_FOLLOW_WORKSPACE,
    value: string | null
}

export const SetRedirectToFollowWorkspace = (value: string | null): ISetRedirectToFollowWorkspace => {
    return {
        type: REDIRECT_TO_FOLLOW_WORKSPACE,
        value
    }
}


export default SettingsReducer;