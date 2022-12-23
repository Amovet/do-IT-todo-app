import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import loader from "../../assets/img/Loader.svg";
import {
    AddWorkspace,
    SetEditWorkspaceDescription,
    SetEditWorkspaceTitle,
    SetViewMore
} from "../../redux/Workspaces-reducer";
import BoardsElement from "../../components/Workspace/Boards/BoardsElement";
import TitleElement from "../../components/Workspace/Title/Title";
import WorkspaceDescription from "../../components/Workspace/Description/WorkspaceDescription";
import moreIco from '../../assets/img/more.svg'
import moreIcoWhite from '../../assets/img/more_white.png'
import settingsIco from '../../assets/img/settings.svg'
import settingsIcoWhite from '../../assets/img/settings_white.png'
import MoreInfo from "../../components/Workspace/MoreInfo/MoreInfo";
import {SetRedirectToMainFalse, SetWindowsViewTrue} from "../../redux/Settings-reducer";
import {DARK, SETTINGS} from "../../Constants/Constants";


function Workspace({
                       newTodo,
                       Name,
                       Description,
                       loading,
                       Background,
                       theme,
                       AddWorkspace,
                       SetEditWorkspaceTitle,
                       editWorkspaceTitle,
                       editWorkspaceDescription,
                       SetEditWorkspaceDescription,
                       SetViewMore,
                       viewMore,
                       SetWindowsViewTrue,
                       redirect,
                       SetRedirectToMainFalse
                   }: any) {

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        AddWorkspace(id)
    }, [id])


    useEffect((): any => {
        if (redirect == true) {
            navigate('/workspace/all')
            SetRedirectToMainFalse()
        }
    }, [redirect])


    return (
        <>
            {loading ?
                <div className='workspace'>
                    <div className='workspace__load'>
                        <div className='workspace__load-container'>
                            <img src={loader} alt="" className='workspace__loader'/>
                            <div className='workspace__load-title'>Load workspaces</div>
                        </div>
                    </div>
                </div>
                :
                <>
                    {Background ? <img className='background' src={Background}/> : null}
                    <section className='workspace'>
                        <div className='workspace__container'>
                            <div className={`workspace__title-container ${theme == DARK ? 'dark' : null}`}>
                                <div>
                                    {!editWorkspaceTitle ?
                                        <div className='workspace__title'
                                             onClick={() => SetEditWorkspaceTitle(true)}>{Name}</div>
                                        :
                                        <TitleElement/>
                                    }
                                    {!editWorkspaceDescription ?
                                        <div className='workspace__description sub'
                                             onClick={() => SetEditWorkspaceDescription(true)}>{Description}</div>
                                        :
                                        <WorkspaceDescription/>
                                    }
                                </div>
                                <div className='workspace__menu'>
                                    <div className='workspace__menu-item' onClick={() => SetViewMore(!viewMore)}>
                                        <img src={theme == DARK ? moreIcoWhite : moreIco} alt=""/>
                                    </div>
                                    {viewMore ? <MoreInfo/> : null}
                                    <div className='workspace__menu-item' onClick={() => SetWindowsViewTrue(SETTINGS)}>
                                        <img src={theme == DARK ? settingsIcoWhite : settingsIco} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className={`workspace__table-container ${newTodo.added ? 'block' : ''}`}>
                                <BoardsElement/>
                            </div>
                        </div>
                    </section>
                </>

            }
        </>

    )
}

const mapStateToProps = (state: any) => ({
    Name: state.WorkspaceReducer.Name,
    Description: state.WorkspaceReducer.Description,
    Boards: state.WorkspaceReducer.Boards,
    loading: state.WorkspaceReducer.Loading,
    Background: state.WorkspaceReducer.Background,
    title: state.TodoReducer.initNewTodo.title,
    newTodo: state.TodoReducer.initNewTodo,
    editWorkspaceTitle: state.WorkspaceReducer.editTitle,
    editWorkspaceDescription: state.WorkspaceReducer.editDescription,
    viewMore: state.WorkspaceReducer.viewMore,
    theme: state.WorkspaceReducer.Theme,
    redirect: state.SettingsReducer.RedirectToMain
})


export default connect(mapStateToProps, {
    AddWorkspace,
    SetEditWorkspaceTitle,
    SetEditWorkspaceDescription,
    SetViewMore,
    SetWindowsViewTrue,
    SetRedirectToMainFalse
})(Workspace);