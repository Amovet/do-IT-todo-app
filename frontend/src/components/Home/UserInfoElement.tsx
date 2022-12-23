import React from 'react';
import {connect} from 'react-redux';

interface UserInfoElementProps {
    photo: string,
    fullName: string,
    email: string,
    isAuth: boolean,
}

const UserInfoElement = ({photo, fullName,  email, isAuth}: UserInfoElementProps) => {


    return (
        <div className="main-page__user">
            {isAuth ? <>
                <div className='account__photo-container'>
                    {photo == undefined || photo == '' ?
                        <div className='account__photo border-solid-gray'>{fullName.substring(0, 1)}</div>
                        :
                        <img src={photo} alt="" className='account__photo'/>
                    }
                </div>
                <div className='account__photo-settings'>
                    <div className='small-title'>
                        {fullName}
                    </div>
                    <div className='account__photo-settings-info sub'>
                        <span>email: </span>
                        {email}
                    </div>
                </div>
            </> : null}

        </div>
    );
}


const mapStateToProps = (state: any) => ({
    Todo: state.TodoReducer,
    photo: state.AuthReducer.user.avatarUrl,
    fullName: state.AuthReducer.user.fullName,
    email: state.AuthReducer.user.email,
    isAuth: state.AuthReducer.isAuthenticated

})

export default connect(mapStateToProps, null)(UserInfoElement);