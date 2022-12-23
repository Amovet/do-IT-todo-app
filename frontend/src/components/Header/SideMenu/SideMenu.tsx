import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import burgerMenu from '../../../assets/img/side-menu.svg'
import {connect} from "react-redux";
import {logoutUser} from "../../../redux/Auth-reducer";
import {deleteWorkspaceInfo} from "../../../redux/Workspaces-reducer";
import WorkspacesIco from '../../../assets/img/allWorkspaces.svg'
import SettingsIco from '../../../assets/img/settings.svg'
import allTodoIco from '../../../assets/img/allTodo.svg'
import upcomingIco from '../../../assets/img/Immediate.svg'
interface SideMenuProps {
    isAuth: boolean,
}

function SideMenu({isAuth}:SideMenuProps) {
    const [toggleSideMenu,setToggleSideMenu]=useState<boolean>(false)

    const navigate = useNavigate();

    return (
            <div className='header__side-menu-container'>
                <div className='side-menu-button' onClick={()=>isAuth?setToggleSideMenu(!toggleSideMenu):null}>
                    <img src={burgerMenu} alt="" className='side-menu-ico'/>
                </div>
                <div className={`side-menu ${toggleSideMenu? 'active': ''}`}>
                    <div className='side-menu__title small-title' onClick={()=>{{isAuth?navigate('/workspace/all'):navigate('/')};setToggleSideMenu(false)}}><img src={WorkspacesIco} alt=""/> All workspaces</div>
                    <div className='side-menu__title small-title' onClick={()=>{{isAuth?navigate('/upcoming'):navigate('/')};setToggleSideMenu(false)}}><img src={upcomingIco} alt=""/> Upcoming</div>
                    <div className='side-menu__title small-title' onClick={()=>{{isAuth?navigate('/all_todo'):navigate('/')};setToggleSideMenu(false)}}><img src={allTodoIco} alt=""/> All to do</div>
                    <div className='side-menu__title small-title' onClick={()=>{{isAuth?navigate('/account'):navigate('/')};setToggleSideMenu(false)}}><img src={SettingsIco} alt=""/> Settings</div>

                </div>
            </div>
    );
}
const mapStateToProps = (state:any) =>({
    user: state.AuthReducer.user,
    workspaces: state.WorkspaceReducer.Workspaces,
    isAuth: state.AuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {logoutUser,deleteWorkspaceInfo})(SideMenu);
