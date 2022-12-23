import React from "react";
import {connect} from "react-redux";
import {AddWorkspace, UpdateBoards} from "../../redux/Workspaces-reducer";
import {SetWindowsViewFalse} from "../../redux/Settings-reducer";
import {
    ADD_TODO_WINDOW, ADD_WORKSPACE_WINDOW,
    SETTINGS
} from "../../Constants/Constants";
import Todo from '../Todo/View_todo'
import Settings from "../Settings/Settings";
import AddWorkspaceElement from '../Workspace/Add_workspace'

interface ErrPageInitial {
    WindowType: string,
    SetWindowsViewFalse: () => void
}

function Window({WindowType, SetWindowsViewFalse}: ErrPageInitial) {

    return (
        <div className='window'>
            <div className='modal-background' onClick={() => SetWindowsViewFalse()}>
            </div>
            <div className='modal'>
                {WindowType == ADD_TODO_WINDOW ? <Todo/> : null}
                {WindowType == SETTINGS ? <Settings/> : null}
                {WindowType == ADD_WORKSPACE_WINDOW ? <AddWorkspaceElement/> : null}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    WindowType: state.SettingsReducer.WindowType,
})


export default connect(mapStateToProps, {AddWorkspace, UpdateBoards, SetWindowsViewFalse})(Window);
;