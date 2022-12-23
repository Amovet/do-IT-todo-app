import {combineReducers,createStore,applyMiddleware,compose} from 'redux'
import WorkspaceReducer from "./Workspaces-reducer";
import AuthReducer from './Auth-reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga/sagas";
import SettingsReducer from "./Settings-reducer";
import TodoReducer from "./Todo-reducer";

const initialState ={};
const saga = createSagaMiddleware()

let reducers = combineReducers({
    AuthReducer,
    WorkspaceReducer,
    SettingsReducer,
    TodoReducer
});

declare global
{
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers,initialState, composeEnhancers(applyMiddleware(saga)));

saga.run(rootSaga)

export default store