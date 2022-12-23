import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect} from 'react-redux'
import {signupUser} from "../../redux/Auth-reducer";

interface I_signup_props {
    isAuthenticated: boolean,
    signupUser: (fullName: string, email: string, password: string, re_password: string) => void
}

const Signup = ({signupUser, isAuthenticated}: I_signup_props) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        re_password: ''
    });

    const {fullName, email, password, re_password} = formData;

    const onChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (password === re_password) {
            signupUser(fullName, email, password, re_password);
        } else {
            alert('Passwords dont match')
        }
    };


    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (

        <section className="login-container reg">
            <div className="login-container__box">
                <div className="login_animation">
                    <span className='login-container__title title-medium'>Create your account</span>
                    <div className="login-container__registration">
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='login-container__input-container'>
                                <input type="text" name='fullName' value={fullName}
                                       className='login-container__input-area' onChange={e => onChange(e)}
                                       placeholder="Name" required></input>
                                <input type="email" name='email' value={email} className='login-container__input-area'
                                       onChange={e => onChange(e)} placeholder="Login or Email" required></input>
                                <input type="password" name='password' value={password}
                                       className='login-container__input-area' placeholder="Password"
                                       onChange={e => onChange(e)} minLength={8} required></input>
                                <input type="password" name='re_password' value={re_password}
                                       className='login-container__input-area' placeholder="Confirm your password"
                                       onChange={e => onChange(e)} minLength={8} required></input>
                            </div>
                            <button type='submit' className='login-container__submit register'>Register</button>
                        </form>
                    </div>
                    <Link to="/login" className="login-container__signup">Already have an account? Sign in</Link>
                </div>
            </div>
        </section>
    );
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated
})

export default connect(mapStateToProps, {signupUser})(Signup);