import React, {useState} from "react";
import {connect} from "react-redux";
import {SetConfirm, UploadBackground} from "../../../redux/Workspaces-reducer";
import UpIco from "../../../assets/img/up.svg";
import dropDownIco from "../../../assets/img/drop.svg";



interface DeleteWorkspaceElementProps{
    Name:string,
    workspacesId:number,
    SetConfirm:any
}

function DeleteWorkspaceElement({Name,workspacesId,SetConfirm}:DeleteWorkspaceElementProps){
    const [workspaceDelete, setWorkspaceDelete] = useState(false);
    const [confirm, setConfirm] = useState('');
    const [viewDelete, setViewDelete] = useState(false);


    return(
        <>
            <div className='settings-window__title small-title' onClick={() => setViewDelete(!viewDelete)}>
                <div>Delete workspace</div>
                <img src={viewDelete ? UpIco : dropDownIco} alt=""/>
            </div>
            {viewDelete ?
                <div className='settings-window__delete-container'>
                    {!workspaceDelete ?
                        <div className='settings-window__delete-click' onClick={() => setWorkspaceDelete(true)}>
                            Click to delete workspace
                        </div>
                        :
                        <>
                            <div className='settings-window__confirm-title'>
                                Please type: <span className='bold'>{Name}</span> to confirm.
                            </div>
                            <input type="text" className='settings-window__confirm-input' value={confirm}
                                   onChange={e => setConfirm(e.target.value)}/>
                            <div className='settings-window__confirm-delete' onClick={() => {
                                confirm == Name ? SetConfirm(workspacesId) : <></>
                            }}>
                                Delete workspace completely
                            </div>
                        </>
                    }
                </div>
                : null
            }
        </>
    )
}

const mapStateToProps = (state:any) =>({
    Name:state.WorkspaceReducer.Name,
    workspacesId:state.WorkspaceReducer.id
})


export default connect(mapStateToProps, {UploadBackground,SetConfirm})(DeleteWorkspaceElement);