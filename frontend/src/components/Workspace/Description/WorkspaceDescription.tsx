import React from "react";
import {connect} from "react-redux";
import {WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION,} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";
import {
    SetWorkspaceDescription,
    UpdateWorkspaceDescription,
} from "../../../redux/Workspaces-reducer";


interface TitleInitial{
    Description:string,
    UpdateWorkspaceDescription:(value:string)=>void,
    SetWorkspaceDescription:()=>void,
}

function TitleWorkspaceElement({Description,UpdateWorkspaceDescription,SetWorkspaceDescription}:TitleInitial){

    const onChange = (e:any) => {UpdateWorkspaceDescription(e.target.value)}

    return(
        <OutsideAlerter type={WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION}>
            <input type='text' name='title'
                   onKeyDown={(e:any)=>e.keyCode==13? SetWorkspaceDescription():null}
                   className='workspace__description sub'
                   value={Description}
                   onChange={e=> onChange(e)}
                   placeholder="Enter your title"
                   minLength={10}/>
        </OutsideAlerter>
    )
}

const mapStateToProps = (state:any) =>({
    Description:state.WorkspaceReducer.Description,
})


export default connect(mapStateToProps, {UpdateWorkspaceDescription,SetWorkspaceDescription})(TitleWorkspaceElement);