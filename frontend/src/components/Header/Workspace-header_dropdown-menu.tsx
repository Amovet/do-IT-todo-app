import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import WorkspaceHeaderItem from "./Workspace-header_item";
import {SetWindowsViewTrue} from "../../redux/Settings-reducer";
import {ADD_WORKSPACE_WINDOW} from "../../Constants/Constants";
import {WorkspaceTypes} from "../../redux/Workspaces-reducer";

interface WorkspaceHeaderMenuProps {
    workspaces: Array<WorkspaceTypes>,
    SetWindowsViewTrue: (type:string)=>void,
    isAuth: boolean,
    workspaceMenuRef:any
}

function WorkspaceHeaderMenu({workspaces,SetWindowsViewTrue,isAuth,workspaceMenuRef}:WorkspaceHeaderMenuProps){

    return (
        <div className='header__drop-down-menu' ref={workspaceMenuRef}>
            {isAuth ?
                <>
                    {workspaces.length > 0 ?
                        <>{
                            workspaces.slice(0, 5).map((e: any) =>
                                <WorkspaceHeaderItem
                                    key={e._id}
                                    id={e._id}
                                    title={e.title}
                                />
                            )
                        }</>
                        :null
                    }
                    {workspaces.length > 5 ?
                        <div className='header__drop-down-menu_elem'>
                            <Link to='/workspace/all' className='header__drop-down-menu_elem-link'>
                                View all workspaces
                            </Link>
                        </div>
                        :
                        null
                    }
                    <div className='header__drop-down-menu_elem'>
                        <div className='header__drop-down-menu_elem-link'
                             onClick={() => SetWindowsViewTrue(ADD_WORKSPACE_WINDOW)}>
                            Add new workspace
                        </div>
                    </div>
                </>
                :
                <div>There could be your workspaces</div>
            }
        </div>
    )
}
const mapStateToProps = (state:any) =>({
    workspaces: state.WorkspaceReducer.Workspaces,
    isAuth:state.AuthReducer.isAuthenticated
})


export default connect(mapStateToProps, {SetWindowsViewTrue})(WorkspaceHeaderMenu);