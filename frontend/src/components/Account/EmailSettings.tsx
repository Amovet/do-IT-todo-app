import React, {useState} from 'react';
import {connect} from 'react-redux'
import {UpdateEmail} from "../../redux/Auth-reducer";

interface AccountsEmailSettingsProps {
    email:string,
    UpdateEmail:(email:string)=>void,

}

const AccountsEmailSettings = ({email,UpdateEmail}:AccountsEmailSettingsProps) =>{
    const [inputEmail, setInputEmail] = useState(email);

    return (
        <div className="account__elem-container">
            <div className="account__elem-subtitle medium-title">Email</div>
            <div className='account__elem-content account__name-container'>
                <input type="email" value={inputEmail} name='name' onChange={e=>setInputEmail(e.target.value)} className='account__name'/>
                <div className='account__name-info sub'> Type valid email address  </div>
                <div className='buttons bg-gray-light buttons-name' onClick={()=>UpdateEmail(inputEmail)}>Set email</div>
            </div>
        </div>
    )
}
const mapStateToProps = (state:any) =>({
    email:state.AuthReducer.user.email,
})

export default connect(mapStateToProps, {UpdateEmail})(AccountsEmailSettings);