import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect} from 'react-redux'
import {loginUser} from "../../redux/Auth-reducer";

export interface AuthProps {
    isAuthenticated: boolean,
    loginUser: (email:string,password:string)=>void
}

const UserPage = ({isAuthenticated, loginUser}: AuthProps) => {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
        });

    const {email, password} = formData;

    const onChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e: any) => {
        e.preventDefault();
        loginUser(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (

        <section className="login-container">
            <div className="login-container__box">
                <div className="login_animation">
                    <div className="login-container__title">Log in</div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='login-container__input-container'>
                            <input type="email" name='email' value={email} className='login-container__input-area'
                                   onChange={e => onChange(e)} placeholder="Enter your email" required></input>
                            <input type="password" name='password' value={password}
                                   className='login-container__input-area' placeholder="Enter your password"
                                   onChange={e => onChange(e)} minLength={6} required></input>
                        </div>
                        <button type='submit' className='login-container__submit login'>Login</button>
                    </form>

                    <Link to="/signup" className="login-container__signup">Sign up now</Link>
                </div>
            </div>
        </section>
    );
}


const mapStateToProps = (state: any) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated,
    loginFail: state.AuthReducer.loginFail,
})

export default connect(mapStateToProps, {loginUser})(UserPage);