import React,{useEffect} from 'react'
import {connect} from "react-redux";
import {checkAuthenticated} from "../redux/Auth-reducer";
import loader from '../assets/img/Loader.svg'
import {useNavigate} from "react-router-dom";
import {SetRedirectToNewWorkspaceFalse} from "../redux/Settings-reducer";


const AuthLayout = ({checkAuthenticated, children,Auth,RedirectToNewWorkspace,SetRedirectToNewWorkspaceFalse}: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        checkAuthenticated()
    }, []);
    useEffect(()=>{
        if(RedirectToNewWorkspace!==null){
            navigate(`/workspace/${RedirectToNewWorkspace}`)
            SetRedirectToNewWorkspaceFalse()
        }
    },[RedirectToNewWorkspace])
    return (
        <>
            {Auth==null?
                <div className='load-app'>
                    <div className='load-app__container'>
                    <img src={loader} alt="" className='load-app__loader'/>
                    <div className='load-app__title'>Load DO IT app</div>
                    </div>
                </div>
                :
                children}
        </>
    );
};
const mapStateToProps = (state:any) =>({
    Auth: state.AuthReducer.authFail,
    RedirectToNewWorkspace: state.SettingsReducer.RedirectToNewWorkspace


})
export default connect( mapStateToProps, {checkAuthenticated,SetRedirectToNewWorkspaceFalse})(AuthLayout);