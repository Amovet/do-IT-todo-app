import React, {useState} from 'react';
import {connect} from 'react-redux'
import {UpdateName} from "../../redux/Auth-reducer";

interface AccountsNameSettingsProps {
    fullName: string,
    UpdateName:(name:string)=>void,

}

const AccountsNameSettings = ({fullName,UpdateName}:AccountsNameSettingsProps) =>{
    const [inputFullName, setInputFullName] = useState(fullName);

    return (
        <div className="account__elem-container">
            <div className="account__elem-subtitle medium-title">Name</div>
            <div className='account__elem-content account__name-container'>
                <input type="text" value={inputFullName} name='name' onChange={e=>setInputFullName(e.target.value)} className='account__name'/>
                <div className='account__name-info sub'> Minimum number of characters 5</div>
                <div className='buttons bg-gray-light buttons-name' onClick={()=>UpdateName(inputFullName)}>Set name</div>
            </div>
        </div>
    )
}
const mapStateToProps = (state:any) =>({
    fullName:state.AuthReducer.user.fullName,
})

export default connect(mapStateToProps, {UpdateName})(AccountsNameSettings);