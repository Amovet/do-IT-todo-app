import React, {useState} from 'react';
import {connect} from 'react-redux'
import {DeleteUserPhoto, signupUser, UpdateEmail, UpdateName} from "../../redux/Auth-reducer";
import AddFilesElement from "../../components/LoadFile/Add_files";
import {LOAD_USER_IMG} from "../../Constants/Constants";

interface AccountsPhotoSettingsProps {
    photo: string,
    fullName: string,
    DeleteUserPhoto:()=>void,

}

const AccountsPhotoSettings = ({photo,fullName,DeleteUserPhoto}:AccountsPhotoSettingsProps) =>{
    const [loadView, setLoadView] = useState(false);

    return (
        <div className="account__elem-container">
            <div className="account__elem-subtitle medium-title">Photo</div>
            <div className='account__elem-content flex-row account__elem-photo'>
                <div className='account__photo-container'>
                    {photo==undefined||photo==''?
                        <div className='account__photo border-solid-gray'>{fullName.substring(0, 1)}</div>
                        :
                        <img src={photo} alt="" className='account__photo'/>
                    }
                </div>
                <div className='account__photo-settings'>
                    <div className='account__photo-settings-buttons'>
                        {photo==undefined||photo==''?
                            <>
                                <div className='buttons bg-gray-light' onClick={()=>setLoadView(!loadView)}>{loadView?'Close update menu':'Load photo'}</div>
                            </>
                            :
                            <>
                                <div className='buttons bg-gray-light' onClick={()=>setLoadView(!loadView)}>{loadView?'Close update menu':'Update photo'}</div>
                                <div className='buttons bg-and-border-red' onClick={()=>DeleteUserPhoto()}>Delete photo</div>
                            </>
                        }
                    </div>
                    <div className='account__photo-settings-info sub'>Select a photo up to 10MB in jpg format.</div>
                </div>

            </div>
            {loadView?
                <AddFilesElement type={LOAD_USER_IMG} /> :null}
        </div>
    )
}
const mapStateToProps = (state:any) =>({
    photo:state.AuthReducer.user.avatarUrl,
    fullName:state.AuthReducer.user.fullName,
})

export default connect(mapStateToProps, {DeleteUserPhoto})(AccountsPhotoSettings);