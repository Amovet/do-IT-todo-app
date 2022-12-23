import React from 'react';
import {connect} from 'react-redux';
import {
    ADD_WORKSPACE_WINDOW,
    ALL_TODO_TYPE,
    IMMEDIATE_TODO_TYPE,
} from "../../Constants/Constants";
import WorkspaceItem from "../../components/Workspace/Workspace_item";
import loader from "../../assets/img/Loader.svg";
import {GetUpcomingTodo} from "../../redux/Todo-reducer";
import GetTodosByType from "../GetTodosByType/GetTodosByType";
import AllWorkspacesIco from '../../assets/img/allWorkspaces.svg'
import {SetWindowsViewTrue} from "../../redux/Settings-reducer";
import {WorkspaceTypes} from "../../redux/Workspaces-reducer";

interface UserInfoElementProps {
    workspaces: Array<WorkspaceTypes>,
    loading: boolean,
    SetWindowsViewTrue: (value: string) => void,
}


const WorkspaceAndTodoElement = ({loading, workspaces, SetWindowsViewTrue}: UserInfoElementProps) => {


    return (
        <div className="main-page__column">
            <div className="main-page__workspace-container">
                <div className="main-page__workspace">
                    <div className="main-page__block-title small-title">
                        <img src={AllWorkspacesIco} alt=""/>
                        All workspace
                    </div>
                    {loading ?
                        <div className='main-page__load'>
                            <div className="main-page__load-container">
                                <img src={loader} alt=""/>
                                <div className='workspace__load-title'></div>
                            </div>
                        </div>
                        :
                        <>
                            {workspaces !== undefined && workspaces !== null ?
                                <>
                                    <div className='main-page__elem-workspace-container'>{workspaces.map((e: any) =>
                                        <WorkspaceItem key={e._id} title={e.title} id={e._id}
                                                       description={e.description}/>)
                                    }</div>
                                    {workspaces.length < 1 ?
                                        <div className="main-page__block-info">So far, not a single workspace has been
                                            added yet ;(</div> : null}
                                </>
                                : null}
                            <div className='workspace__view-all'
                                 onClick={() => SetWindowsViewTrue(ADD_WORKSPACE_WINDOW)}>Create new workspace
                            </div>
                        </>
                    }

                </div>
            </div>
            <div className='main-page__todos-container'>
                <div className="main-page__immediate-todo">
                    <GetTodosByType type={IMMEDIATE_TODO_TYPE}/>
                </div>
                <div className="main-page__all-todo">
                    <GetTodosByType type={ALL_TODO_TYPE}/>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state: any) => ({
    Todo: state.TodoReducer,
    loading: state.SettingsReducer.LoadingAllTodo,
    workspaces: state.WorkspaceReducer.Workspaces,

})

export default connect(mapStateToProps, {GetUpcomingTodo, SetWindowsViewTrue})(WorkspaceAndTodoElement);