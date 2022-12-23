import React from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from 'react-redux'
import {UpdateEmail, UpdateName} from "../../redux/Auth-reducer";
import AccountsPhotoSettings from "../../components/Account/PhotoSettings";
import AccountsNameSettings from "../../components/Account/NameSettings";
import AccountsEmailSettings from "../../components/Account/EmailSettings";

interface SettingsProps {
    isAuth: boolean
}

const Accounts = ({isAuth}: SettingsProps) => {

    const navigate = useNavigate();
    let RedirectToMainPage = () => {
        navigate('/')
    }
    return (
        <>
            {isAuth ?
                <section className='account'>
                    <div className='account__container'>
                        <div className='account__title title-container'>
                            <div className='title'>Accounts info</div>
                        </div>
                        <div className="account__main main-container">
                            <AccountsPhotoSettings/>
                            <AccountsNameSettings/>
                            <AccountsEmailSettings/>
                        </div>
                    </div>
                </section>
                : () => RedirectToMainPage()}
        </>
    )
}
const mapStateToProps = (state: any) => ({
    isAuth: state.AuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {UpdateName, UpdateEmail})(Accounts);