import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Undef_person from '../../assets/img/person_default_48px.svg';

interface I_login_props {
    isAuthenticated: boolean,
    user: I_user_props,
    authFail: boolean | null
}

interface I_user_props {
    _id: string,
    fullName: string,
    email: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,

}

const UserPage = ({isAuthenticated, user, authFail}: I_login_props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (authFail == true && isAuthenticated == false) {
            navigate("/");
        }
    }, [authFail])

    const userImg = () => {
        return (
            <>
                {user == null ?
                    <div>user page is loading</div>
                    :
                    user.avatarUrl == undefined ?
                        <img src={Undef_person} alt=""/>
                        :
                        <img src={Undef_person} alt=""/>}
            </>
        )
    }

    return (
        <section className="user-page">
            <div>
                {userImg()}
            </div>
            <br/>
            <div>name: {user == null ? <div>load</div> : user.fullName}</div>
            <br/>
            <div>email: {user == null ? <div>load</div> : user.email}</div>
        </section>
    );
}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated,
    authFail: state.AuthReducer.authFail,
    user: state.AuthReducer.user
})

export default connect(mapStateToProps, null)(UserPage);