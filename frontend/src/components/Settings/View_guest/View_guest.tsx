import React, {useState} from "react";
import {connect} from "react-redux";
import UpIco from "../../../assets/img/up.svg";
import dropDownIco from "../../../assets/img/drop.svg";
import inviteIco from "../../../assets/img/Invite.svg";

interface WorkspaceInitial {
    guestUsers: Array<object | null>,
    userId: string,

}

function GuestElement({guestUsers, userId}: WorkspaceInitial) {
    const [viewGuest, setViewGuest] = useState(false);


    let AllGuest = guestUsers.map((e: any) =>

        <div className='settings-window__guest-elem' key={e._id}>
            {e.avatarUrl == undefined || e.avatarUrl == '' ?
                <div
                    className='settings-window__guest-elem-photo border-solid-gray'>{e.fullName.substring(0, 1)}</div>
                :
                <img src={e.avatarUrl} alt="" className='settings-window__guest-elem-photo'/>
            }
            <div className='settings-window__guest-info-title'>{e.fullName}</div>
            {userId == e._id ?
                <div className='indicator sub'>your account</div>
                :
                null}

        </div>
    )

    return (
        <div className='settings-window__guest'>
            <div className='settings-window__title small-title' onClick={() => setViewGuest(!viewGuest)}>
                <div>View guest users</div>
                <img src={viewGuest ? UpIco : dropDownIco} alt=""/>
            </div>
            {viewGuest ?
                <>
                    {AllGuest}
                    {guestUsers.length < 1 ?
                        <div className='settings-window__guest-invite'>
                            <div className='settings-window__guest-info'>So far, no one has come in yet...</div>
                            <img src={inviteIco} alt=""/>
                            <div>Invite other users to work together more efficiently</div>
                        </div>
                        :
                        null}
                </>
                :
                null
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    guestUsers: state.WorkspaceReducer.Guest,
    userId: state.AuthReducer.user._id
})


export default connect(mapStateToProps, null)(GuestElement);