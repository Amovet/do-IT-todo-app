export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP = 'SIGNUP';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN = 'LOGIN';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const CHECK_AUTHENTICATED = 'CHECK_AUTHENTICATED';
export const UPLOAD_USER_PHOTO = 'UPLOAD_USER_PHOTO';
export const DELETE_USER_PHOTO = 'DELETE_USER_PHOTO';
export const SET_USER_PHOTO = 'SET_USER_PHOTO';
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOAD_USER = 'LOAD_USER';
export const UPDATE_NAME = 'UPDATE_NAME';
export const SET_NAME = 'SET_NAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SET_EMAIL = 'SET_EMAIL';

export interface UserType {
    fullName: string,
    email: string,
    guestWorkspaces?: Array<String>,
    avatarUrl?: string,
    createAt: string,
    updateAt: string,
}

interface IinitialState {
    token: string | null,
    isAuthenticated: boolean | null,
    user: object | null,
    access: string | null,
    loginFail: boolean,
    authFail: boolean | null,
}

let initialState: IinitialState =
    {
        token: null,
        isAuthenticated: false,
        loginFail: false,
        access: null,
        user: null,
        authFail: null
    };

type initialState = typeof initialState

const AuthReducer = (state = initialState, action: IActions): initialState => {

    switch (action.type) {
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            }
        case LOAD_USER:
            return {
                ...state,
                loginFail: false,
                user: action.user,
                token: action.token,
                isAuthenticated: true,
                authFail: false
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                token: null,
                user: null,
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarUrl: action.filesUrl
                }
            }
        case SET_NAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    fullName: action.name
                }
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                authFail: true
            }
        default:
            return state;

    }


}


type IActions =
    Ilogout
    | ILoadUserFail
    | ILogoutSuccess
    | IAuthenticatedFail
    | IcheckAuthenticated
    | ILogin
    | IsignUp
    | Iload_user
    | IUploadUserPhoto
    |
    ISetUserPhoto
    | IDeleteUserPhoto
    | IUpdateName
    | ISetName
    | IUpdateEmail
    | ISetEmail

export interface Ilogout {
    type: typeof LOGOUT
}

export interface ILoadUserFail {
    type: typeof LOAD_USER_FAIL
}

export interface IAuthenticatedFail {
    type: typeof AUTHENTICATED_FAIL
}

export interface ILogoutSuccess {
    type: typeof LOGOUT_SUCCESS
}


export const logoutUser = (): Ilogout => {
    return {
        type: LOGOUT,
    }
}

export interface IcheckAuthenticated {
    type: typeof CHECK_AUTHENTICATED,
}

export const checkAuthenticated = (): IcheckAuthenticated => {
    return {
        type: CHECK_AUTHENTICATED,
    }
}

export interface ILogin {
    type: typeof LOGIN,
    email: string,
    password: string
}

export const loginUser = (email: string, password: string): ILogin => {
    return {
        type: LOGIN,
        email: email,
        password: password
    }
}

export interface IsignUp {
    type: typeof SIGNUP,
    fullName: string,
    email: string,
    password: string
}

export const signupUser = (fullName: string, email: string, password: string,): IsignUp => {
    return {
        type: SIGNUP,
        fullName: fullName,
        email: email,
        password: password
    }
}

export interface Iload_user {
    type: typeof LOAD_USER,
    user: object,
    token: string
}

export const loadUser = (user: object, token: string): Iload_user => {
    return {
        type: LOAD_USER,
        user: user,
        token: token
    }
}

export interface IUploadUserPhoto {
    type: typeof UPLOAD_USER_PHOTO,
    files: any,
}

export const UploadUserPhoto = (files: any): IUploadUserPhoto => {
    return {
        type: UPLOAD_USER_PHOTO,
        files
    }
}

export interface ISetUserPhoto {
    type: typeof SET_USER_PHOTO,
    filesUrl: string
}

export const SetUserPhoto = (filesUrl: string): ISetUserPhoto => {
    return {
        type: SET_USER_PHOTO,
        filesUrl
    }
}

export interface IDeleteUserPhoto {
    type: typeof DELETE_USER_PHOTO,
}

export const DeleteUserPhoto = (): IDeleteUserPhoto => {
    return {
        type: DELETE_USER_PHOTO,
    }
}

export interface IUpdateName {
    type: typeof UPDATE_NAME,
    name: string
}

export const UpdateName = (name: string): IUpdateName => {
    return {
        type: UPDATE_NAME,
        name
    }
}

export interface ISetName {
    type: typeof SET_NAME,
    name: string
}

export const SetName = (name: string): ISetName => {
    return {
        type: SET_NAME,
        name
    }
}

export interface IUpdateEmail {
    type: typeof UPDATE_EMAIL,
    email: string
}

export const UpdateEmail = (email: string): IUpdateEmail => {
    return {
        type: UPDATE_EMAIL,
        email
    }
}

export interface ISetEmail {
    type: typeof SET_EMAIL,
    email: string
}

export const SetEmail = (email: string): ISetEmail => {
    return {
        type: SET_EMAIL,
        email
    }
}


export default AuthReducer;