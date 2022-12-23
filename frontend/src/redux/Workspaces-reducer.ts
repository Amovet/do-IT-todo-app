import {UserType} from "./Auth-reducer";

export const SET_WORKSPACE = 'SET_WORKSPACE';
export const ADD_WORKSPACE = 'ADD_WORKSPACE';
export const CREATE_WORKSPACE = 'CREATE_WORKSPACE';
export const SET_ALL_WORKSPACE = 'SET_ALL_WORKSPACE';
export const DELETE_ALL_WORKSPACE = 'DELETE_ALL_WORKSPACE';
export const SET_LOAD_TRUE = 'SET_LOAD_TRUE';
export const UPDATE_WORKSPACE_TITLE = 'UPDATE_WORKSPACE_TITLE';
export const ADD_BOARDS = 'ADD_BOARDS';
export const CLEAN_WORKSPACE_INFO = 'CLEAN_WORKSPACE_INFO';
export const UPDATE_BOARDS = 'UPDATE_BOARDS';
export const EDIT_WORKSPACE_TITLE = 'EDIT_WORKSPACE_TITLE';
export const EDIT_WORKSPACE_DESCRIPTION = 'EDIT_WORKSPACE_DESCRIPTION';
export const SET_WORKSPACE_TITLE = 'SET_WORKSPACE_TITLE';
export const SET_INIT_WORKSPACE_DESCRIPTION = 'SET_INIT_WORKSPACE_DESCRIPTION';
export const SET_INIT_WORKSPACE_TITLE = 'SET_INIT_WORKSPACE_TITLE';
export const UPDATE_WORKSPACE_DESCRIPTION = 'UPDATE_WORKSPACE_DESCRIPTION';
export const SET_WORKSPACE_DESCRIPTION = 'SET_WORKSPACE_DESCRIPTION';
export const SET_VIEW_MORE = 'SET_VIEW_MORE';
export const UPLOAD_BACKGROUND = 'UPLOAD_BACKGROUND';
export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SELECT_BACKGROUND = 'SELECT_BACKGROUND';
export const ADD_THEME = 'ADD_THEM';
export const SET_THEME = 'SET_THEM'
export const SET_CONFIRM = 'SET_CONFIRM'
export const SET_SECRET_WORD = 'SET_SECRET_WORD'
export const SET_SECRET_KEY = 'SET_SECRET_KEY'


export interface WorkspaceTypes {
    title: string,
    description: string,
    QueueeTodo: Array<object | string>,
    DevelopmentTodo: Array<object | string>,
    DoneTodo: Array<object | string>,
    Guest?: Array<object | string>,
    endTime?: string,
    backgroundImgUrl?: string,
    shareKey?: string,
    theme?: string,
    user?: UserType,
    createAt: string,
    updateAt: string,
}

export interface BoardTypes {
    title: string,
    items: Array<object>
}


interface initialState {
    Name: string | null,
    Description: string | null,
    id: number | null,
    Boards: Array<BoardTypes> | null,
    DataCreate: string | null,
    DataUpdate: string | null,
    Background: string | null,
    Loading: boolean,
    Workspaces: Array<any> | null,
    Theme: string | null;
    prevTitle: string | null,
    prevDescription: string | null,
    editTitle: boolean,
    editDescription: boolean,
    viewMore: boolean,
    Guest: Array<string>,
    Owner: string,
    shareKey: boolean
}

let initialState: initialState =
    {
        Name: null,
        Description: null,
        id: null,
        Boards: null,
        DataCreate: null,
        DataUpdate: null,
        Loading: false,
        Background: null,
        Workspaces: null,
        Theme: null,
        prevTitle: null,
        prevDescription: null,
        editTitle: false,
        editDescription: false,
        viewMore: false,
        Guest: [],
        Owner: '',
        shareKey: false
    };


const WorkspaceReducer = (state = initialState, action: IActions) => {
    switch (action.type) {
        case SET_ALL_WORKSPACE:
            return {
                ...state,
                Workspaces: action.workspaces
            }
        case CLEAN_WORKSPACE_INFO:
            return {
                ...state,
                ...initialState,
                Workspaces: state.Workspaces,
                Loading: state.Loading,
            }
        case DELETE_ALL_WORKSPACE:
            return {
                ...state,
                ...initialState,
                Workspaces: action.workspaces
            }
        case SET_INIT_WORKSPACE_TITLE:
            return {
                ...state,
                Name: state.prevTitle
            }
        case SET_INIT_WORKSPACE_DESCRIPTION:
            return {
                ...state,
                Description: state.prevDescription
            }
        case SET_LOAD_TRUE:
            return {
                ...state,
                Loading: true,
            }
        case EDIT_WORKSPACE_TITLE:
            return {
                ...state,
                editTitle: action.value
            }
        case EDIT_WORKSPACE_DESCRIPTION:
            return {
                ...state,
                editDescription: action.value
            }
        case UPDATE_WORKSPACE_TITLE:
            return {
                ...state,
                Name: action.name,
            }
        case UPDATE_WORKSPACE_DESCRIPTION:
            return {
                ...state,
                Description: action.description,
            }
        case SET_VIEW_MORE:
            return {
                ...state,
                viewMore: action.value,
            }
        case SET_BACKGROUND:
            return {
                ...state,
                Background: action.files,
            }
        case SET_THEME:
            return {
                ...state,
                Theme: action.theme,
            }
        case SET_WORKSPACE:
            return {
                ...state,
                Name: action.name,
                Description: action.description,
                id: action.id,
                DataCreate: action.dataCreate,
                DataUpdate: action.dataUpdate,
                Loading: false,
                Background: action.background,
                Boards: action.boards,
                prevTitle: action.name,
                prevDescription: action.description,
                Theme: action.theme,
                Guest: action.guest,
                Owner: action.owner,
                shareKey: action.shareKey
            }
        case SET_SECRET_KEY:
            return {
                ...state,
                shareKey: action.value
            }
        case ADD_BOARDS:
            return {
                ...state,
                Boards: action.Boards
            }
        default:
            return state;
    }
}


type IActions = IAddAllWorkspaces | ICleanWorkspaceInfo | IsetLoadTrue | IdeleteWorkspaceInfo |
    IAddWorkspace | IsetWorkspace | IsetBoards | IUpdateBoards | ISetEditWorkspaceTitle | ISetInitWorkspaceTitle |
    IUpdateWorkspaceTitle | ISetWorkspaceTitle | ISetEditWorkspaceDescription | ISetInitWorkspaceDescription |
    IUpdateWorkspaceDescription | ISetWorkspaceDescription | ISetViewMore | IUploadBackground |
    ISelectBackground | ISetBackground | IAddTheme | ISetTheme | ISetConfirm | ICreateWorkspace |
    ISetSecretWord | ISetSecretKey

export interface IAddAllWorkspaces {
    type: typeof SET_ALL_WORKSPACE,
    workspaces: WorkspaceTypes
}

export const AddAllWorkspaces = (workspaces: WorkspaceTypes): IAddAllWorkspaces => {
    return {
        type: SET_ALL_WORKSPACE,
        workspaces
    }
}

export interface ICleanWorkspaceInfo {
    type: typeof CLEAN_WORKSPACE_INFO,
}

export const CleanWorkspaceInfo = (): ICleanWorkspaceInfo => {
    return {
        type: CLEAN_WORKSPACE_INFO,
    }
}

export interface IsetLoadTrue {
    type: typeof SET_LOAD_TRUE,
}

export const setLoadTrue = (): IsetLoadTrue => {
    return {
        type: SET_LOAD_TRUE,
    }
}

export interface IdeleteWorkspaceInfo {
    type: typeof DELETE_ALL_WORKSPACE,
    workspaces: WorkspaceTypes
}

export const deleteWorkspaceInfo = (workspaces: WorkspaceTypes): IdeleteWorkspaceInfo => {
    return {
        type: DELETE_ALL_WORKSPACE,
        workspaces
    }
}

export interface IAddWorkspace {
    type: typeof ADD_WORKSPACE,
    id: string
}

export const AddWorkspace = (id: string): IAddWorkspace => {
    return {
        type: ADD_WORKSPACE,
        id
    }

}

export interface IsetWorkspace {
    type: typeof SET_WORKSPACE,
    name: string,
    description: string,
    id: number,
    dataCreate: string,
    dataUpdate: string,
    background: string,
    boards: Array<BoardTypes>,
    theme: string,
    guest: Array<string>,
    owner: string,
    shareKey: boolean
}

export const setWorkspace = (name: string, description: string, id: number,
                             dataCreate: string, dataUpdate: string, background: string,
                             boards: Array<BoardTypes>, theme: string, guest: Array<string>,
                             owner: string, shareKey: boolean): IsetWorkspace => {
    return {
        type: SET_WORKSPACE,
        name,
        description,
        id,
        dataCreate,
        dataUpdate,
        background,
        boards,
        theme,
        guest,
        owner,
        shareKey
    }

}

export interface IsetBoards {
    type: typeof ADD_BOARDS,
    Boards: BoardTypes
}


export const setBoards = (Boards: BoardTypes): IsetBoards => {
    return {
        type: ADD_BOARDS,
        Boards
    }

}

export interface IUpdateBoards {
    type: typeof UPDATE_BOARDS,
    id: string | undefined,
    boards: BoardTypes
}

export const UpdateBoards = (id: string | undefined, boards: BoardTypes): IUpdateBoards => {
    return {
        type: UPDATE_BOARDS,
        id,
        boards
    }
}

export interface ISetEditWorkspaceTitle {
    type: typeof EDIT_WORKSPACE_TITLE,
    value: boolean
}

export const SetEditWorkspaceTitle = (value: boolean): ISetEditWorkspaceTitle => {
    return {
        type: EDIT_WORKSPACE_TITLE,
        value
    }
}

export interface ISetInitWorkspaceTitle {
    type: typeof SET_INIT_WORKSPACE_TITLE,
}


export const SetInitWorkspaceTitle = (): ISetInitWorkspaceTitle => {
    return {
        type: SET_INIT_WORKSPACE_TITLE,
    }
}

export interface IUpdateWorkspaceTitle {
    type: typeof UPDATE_WORKSPACE_TITLE,
    name: string
}

export const UpdateWorkspaceTitle = (name: string): IUpdateWorkspaceTitle => {
    return {
        type: UPDATE_WORKSPACE_TITLE,
        name
    }
}

export interface ISetWorkspaceTitle {
    type: typeof SET_WORKSPACE_TITLE,
}

export const SetWorkspaceTitle = (): ISetWorkspaceTitle => {
    return {
        type: SET_WORKSPACE_TITLE,
    }
}

export interface ISetEditWorkspaceDescription {
    type: typeof EDIT_WORKSPACE_DESCRIPTION,
    value: boolean
}

export const SetEditWorkspaceDescription = (value: boolean): ISetEditWorkspaceDescription => {
    return {
        type: EDIT_WORKSPACE_DESCRIPTION,
        value
    }
}

export interface ISetInitWorkspaceDescription {
    type: typeof SET_INIT_WORKSPACE_DESCRIPTION,
}

export const SetInitWorkspaceDescription = (): ISetInitWorkspaceDescription => {
    return {
        type: SET_INIT_WORKSPACE_DESCRIPTION,
    }
}

export interface IUpdateWorkspaceDescription {
    type: typeof UPDATE_WORKSPACE_DESCRIPTION,
    description: string
}

export const UpdateWorkspaceDescription = (description: string): IUpdateWorkspaceDescription => {
    return {
        type: UPDATE_WORKSPACE_DESCRIPTION,
        description
    }
}


export interface ISetWorkspaceDescription {
    type: typeof SET_WORKSPACE_DESCRIPTION
}


export const SetWorkspaceDescription = (): ISetWorkspaceDescription => {
    return {
        type: SET_WORKSPACE_DESCRIPTION,
    }
}

export interface ISetViewMore {
    type: typeof SET_VIEW_MORE,
    value: boolean
}

export const SetViewMore = (value: boolean): ISetViewMore => {
    return {
        type: SET_VIEW_MORE,
        value
    }
}

export interface IUploadBackground {
    type: typeof UPLOAD_BACKGROUND,
    files: any
}

export const UploadBackground = (files: any): IUploadBackground => {
    return {
        type: UPLOAD_BACKGROUND,
        files
    }
}

export interface ISelectBackground {
    type: typeof SELECT_BACKGROUND,
    files: string
}

export const SelectBackground = (files: string): ISelectBackground => {
    return {
        type: SELECT_BACKGROUND,
        files
    }
}

export interface ISetBackground {
    type: typeof SET_BACKGROUND,
    files: string
}

export const SetBackground = (files: string): ISetBackground => {
    return {
        type: SET_BACKGROUND,
        files
    }
}

export interface IAddTheme {
    type: typeof ADD_THEME,
    theme: string
}

export const AddTheme = (theme: string): IAddTheme => {
    return {
        type: ADD_THEME,
        theme,
    }
}

export interface ISetTheme {
    type: typeof SET_THEME,
    theme: string
}

export const SetTheme = (theme: string): ISetTheme => {
    return {
        type: SET_THEME,
        theme,
    }
}

export interface ISetConfirm {
    type: typeof SET_CONFIRM,
    id: string
}

export const SetConfirm = (id: string): ISetConfirm => {
    return {
        type: SET_CONFIRM,
        id,
    }
}

export interface ICreateWorkspace {
    type: typeof CREATE_WORKSPACE,
    name: string,
    description: string
}

export const CreateWorkspace = (name: string, description: string): ICreateWorkspace => {
    return {
        type: CREATE_WORKSPACE,
        name,
        description
    }
}

export interface ISetSecretWord {
    type: typeof SET_SECRET_WORD,
    word: string
}

export const SetSecretWord = (word: string): ISetSecretWord => {
    return {
        type: SET_SECRET_WORD,
        word
    }
}

export interface ISetSecretKey {
    type: typeof SET_SECRET_KEY,
    value: boolean
}

export const SetSecretKey = (value: boolean): ISetSecretKey => {
    return {
        type: SET_SECRET_KEY,
        value
    }
}


export default WorkspaceReducer;