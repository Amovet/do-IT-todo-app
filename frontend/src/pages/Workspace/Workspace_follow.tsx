import React, {useEffect,useState, useRef} from "react";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {
    FollowWorkspace,
    SetRedirectToFollowWorkspace,
} from "../../redux/Settings-reducer";


function WorkspaceFollow({FollowWorkspace,RedirectToFollowWorkspace,SetRedirectToFollowWorkspace,isAuth}:any){
    const [word, setWord] = useState('');
    const {token} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(RedirectToFollowWorkspace!==null){
            let workspaceId = RedirectToFollowWorkspace
            SetRedirectToFollowWorkspace(null)
            navigate(`/workspace/${workspaceId}`)
        }
    }, [RedirectToFollowWorkspace]);



    return(
        <section className='workspace-follow'>
            <div className='workspace-follow__container'>
                {isAuth ?
                        <>
                            <div className='small-title'>
                                Enter the secret word
                            </div>
                            <input type="text" className='remote-input' onChange={(e)=>setWord(e.target.value)}/>
                            <div className='buttons bg-gray-light' onClick={()=>FollowWorkspace(word,token)}>Follow workspace</div>
                        </>
                        :
                        <>
                            <div className='small-title'>
                                To get access to the workspace, first register or login
                            </div>
                            <div className='buttons bg-gray-light' onClick={()=> navigate('/login')}>Sign up</div>
                        </>

                }
            </div>
        </section>

    )
}
const mapStateToProps = (state:any) =>({
    RedirectToFollowWorkspace:state.SettingsReducer.RedirectToFollowWorkspace,
    isAuth:state.AuthReducer.isAuthenticated
})



export default connect(mapStateToProps, {FollowWorkspace,SetRedirectToFollowWorkspace})(WorkspaceFollow);