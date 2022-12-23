import React, {useState} from "react";
import {connect} from "react-redux";
import {SetWindowsViewFalse} from "../../redux/Settings-reducer";
import StyleTitleElement from "./Style_title/Style_title";
import StyleBackgroundElement from "./Style_background/Style_background";
import DeleteWorkspaceElement from "./Delete/Delete_workspace";
import GuestElement from "./View_guest/View_guest";
import RemoteElement from "./Remote/Remote_workspace";


interface WorkspaceInitial {
    SetWindowsViewFalse: () => void
    photo: string,
    fullName: string,
    OwnerId: string,
    userId: string,
    email: string
}

function SettingsElement({SetWindowsViewFalse, photo, fullName, OwnerId, userId, email}: WorkspaceInitial) {


    return (
        <div className='settings-window'>
            <div className='settings-window__header header-block'>
                <div className="header-block__exit" onClick={() => SetWindowsViewFalse()}>
                    <div className='exit-window'/>
                </div>
            </div>
            <div className='settings-window__main-block'>
                <div className='settings-window__owner'>
                    <div className='settings-window__owner-content'>
                        {photo == undefined || photo == '' ?
                            <div
                                className='settings-window__owner-photo border-solid-gray'>{fullName.substring(0, 1)}</div>
                            :
                            <img src={photo} alt="" className='settings-window__owner-photo'/>
                        }
                        <div className='settings-window__owner-info'>
                            <div className='settings-window__owner-info-title'>{fullName}</div>
                            <div className='sub'><span>Owner user,</span>{userId == OwnerId ? `  email: ${email}` : ''}
                            </div>

                        </div>
                    </div>

                </div>
                {userId==OwnerId?<RemoteElement/>:null}
                <GuestElement/>
                <StyleBackgroundElement/>
                <StyleTitleElement/>
                {userId==OwnerId?<DeleteWorkspaceElement/>:null}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    photo: state.WorkspaceReducer.Owner.avatarUrl,
    fullName: state.WorkspaceReducer.Owner.fullName,
    OwnerId: state.WorkspaceReducer.Owner._id,
    userId: state.AuthReducer.user._id,
    email: state.AuthReducer.user.email,

})


export default connect(mapStateToProps, {SetWindowsViewFalse})(SettingsElement);