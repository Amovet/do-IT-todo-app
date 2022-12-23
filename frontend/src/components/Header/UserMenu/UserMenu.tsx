import React from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser, UserType} from "../../../redux/Auth-reducer";
import {deleteWorkspaceInfo} from "../../../redux/Workspaces-reducer";

interface UserMenuProps {
    user: UserType,
    logoutUser: () => void,
    deleteWorkspaceInfo: any,
    setToggleUserMenu: (value: boolean) => void,
    userMenuRef: any,
}

function UserMenu({user, logoutUser, deleteWorkspaceInfo, setToggleUserMenu, userMenuRef}: UserMenuProps) {

    const navigate = useNavigate();

    return (
        <div className='header__profile-toggle-menu profile-menu' ref={userMenuRef}>
            <div className='profile-menu__container'>
                <div className='profile-menu__elem'>
                    <div className='profile-menu__title'>Your account</div>
                    <div className='profile-menu__userinfo'>
                        {user.avatarUrl == undefined || user.avatarUrl == '' ?
                            <div className='profile-menu__img'>{user.fullName.substring(0, 1)}</div>
                            :
                            <img src={user.avatarUrl} alt="" className='profile-menu__img'/>
                        }
                        <div>
                            <div className='profile-menu__username'>{user.fullName}</div>
                            <div className='sub_small'>{user.email}</div>
                        </div>
                    </div>
                    <div className='profile-menu__border bottom-border'/>
                </div>
                <div className='profile-menu__name' onClick={() => {
                    navigate('/workspace/all');
                    setToggleUserMenu(false)
                }}>
                    Workspaces
                </div>
                <div className='profile-menu__name' onClick={() => {
                    navigate('/all_todo');
                    setToggleUserMenu(false)
                }}>
                    All todo
                </div>
                <div className='profile-menu__name' onClick={() => {
                    navigate('/account');
                    setToggleUserMenu(false)
                }}>
                    Settings
                </div>
                <div className='border-logout'>
                    <div className='profile-menu__border bottom-border'/>
                </div>
                <div className='profile-menu__name' onClick={() => {
                    logoutUser();
                    navigate("/");
                    setToggleUserMenu(false);
                    deleteWorkspaceInfo()
                }}>
                    Logout
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.AuthReducer.user,
    workspaces: state.WorkspaceReducer.Workspaces,
    isAuth: state.AuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {logoutUser, deleteWorkspaceInfo})(UserMenu);
