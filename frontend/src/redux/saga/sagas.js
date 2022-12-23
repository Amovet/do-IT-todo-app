import {all, spawn, call} from 'redux-saga/effects'
import {AuthAndLoadUserInfo} from "./auth/auth";
import {LoadUserWorkspaces} from "./workspaces/workspaces";
import {WatcherTodos} from "./todos/todos";
import {SettingsWatcher} from "./settings/settings"

export default function* rootSaga() {
    const sagas = [AuthAndLoadUserInfo, LoadUserWorkspaces, WatcherTodos, SettingsWatcher]
    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                }
            }
        })
    })
    yield all(retrySagas)
}






