import React, { useRef, useState} from 'react';
import {Link} from "react-router-dom";
import dropArrow from '../../assets/img/drop.svg';
import upArrow from '../../assets/img/up.svg'
import {connect} from "react-redux";
import WorkspaceItem from "../../components/Header/Workspace-header_dropdown-menu";
import SearchElement from "./Search/SearchElement";
import SideMenu from "./SideMenu/SideMenu";
import UserMenu from "./UserMenu/UserMenu";
import OutsideMenuAlerter from "../../hoc/Detect-click-menu";
import {UserType} from "../../redux/Auth-reducer";

interface HeaderProps {
    user: UserType,
    isAuth: boolean,
}

function Header({user, isAuth}: HeaderProps) {
    const [toggleUserMenu, setToggleUserMenu] = useState<boolean>(false)
    const [toggleWorkspacesMenu, setToggleWorkspacesMenu] = useState<boolean>(false)
    const workspaceMenuRef = useRef(null);
    const userMenuRef = useRef(null);
    const workspaceMenuElemRef = useRef(null);
    const userMenuElemRef = useRef(null);


    return (
        <section className='header'>
            <SideMenu/>
            <div className='header__container'>
                <div className='header__menu'>
                    <Link to='/' className='header__title'>
                        <div className='header__name'>do IT</div>
                    </Link>
                    <div className='header__menu-elem elem-menu' ref={workspaceMenuElemRef}
                         onClick={() => isAuth ? setToggleWorkspacesMenu(!toggleWorkspacesMenu) : null}>
                        <div>Workspaces</div>
                        <img src={toggleWorkspacesMenu ? upArrow : dropArrow} alt="" className='elem-menu__img'/>
                        {toggleWorkspacesMenu ?
                            <OutsideMenuAlerter menuRef={workspaceMenuRef}
                                                setToggle={setToggleWorkspacesMenu}
                                                toggle={toggleWorkspacesMenu}
                                                menuElemRef={workspaceMenuElemRef}
                            >
                                <WorkspaceItem workspaceMenuRef={workspaceMenuRef}/>
                            </OutsideMenuAlerter>
                            : null}
                    </div>
                    <Link to={isAuth ? '/upcoming' : '/'} className='header__menu-elem elem-menu'>
                        <div>Upcoming</div>
                    </Link>
                    <Link to={isAuth ? '/all_todo' : '/'} className='header__menu-elem elem-menu'>
                        <div>All to do</div>
                    </Link>
                </div>
                <div className='header__user-menu'>
                    {user ?
                        <>
                            <div className='header__search'>
                                <SearchElement/>
                            </div>
                            <div className='header__profile' ref={userMenuElemRef}
                                 onClick={() => setToggleUserMenu(!toggleUserMenu)}>
                                {user.avatarUrl == undefined || user.avatarUrl == '' ?
                                    <div className='header__profile-img'>{user.fullName.substring(0, 1)}</div>
                                    :
                                    <img src={user.avatarUrl} alt="" className='header__profile-img'/>
                                }
                            </div>
                            {toggleUserMenu ?
                                <OutsideMenuAlerter menuRef={userMenuRef}
                                                    setToggle={setToggleUserMenu}
                                                    toggle={toggleUserMenu}
                                                    menuElemRef={userMenuElemRef}
                                >
                                    <UserMenu setToggleUserMenu={setToggleUserMenu} userMenuRef={userMenuRef}/>
                                </OutsideMenuAlerter>
                                : null}
                        </>
                        :
                        <div className='header__auth'>
                            <Link to='/signup' className='header__signup'><span>SIGN UP</span></Link>
                            <Link to='/login' className='header__login'><span>LOGIN</span></Link>
                        </div>
                    }

                </div>
            </div>

        </section>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.AuthReducer.user,
    workspaces: state.WorkspaceReducer.Workspaces,
    isAuth: state.AuthReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Header);
