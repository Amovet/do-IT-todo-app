import React from "react";
import {connect} from "react-redux";
import { WORKSPACE_VALIDATE_AND_UPDATE_TITLE} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";
import {SetWorkspaceTitle, UpdateWorkspaceTitle} from "../../../redux/Workspaces-reducer";


interface TitleInitial{
    Name:string,
    UpdateWorkspaceTitle:any,
    SetWorkspaceTitle:any,
}

function TitleWorkspaceElement({Name,SetWorkspaceTitle,UpdateWorkspaceTitle}:TitleInitial){

    const onChange = (e:any) => {UpdateWorkspaceTitle(e.target.value)}

    return(
        <OutsideAlerter type={WORKSPACE_VALIDATE_AND_UPDATE_TITLE}>
            <input type='text' name='title'
                   onKeyDown={(e:any)=>e.keyCode==13? SetWorkspaceTitle():null}
                   className='workspace__title'
                   value={Name}
                   onChange={e=> onChange(e)}
                   placeholder="Enter your title"
                   minLength={5}/>
        </OutsideAlerter>
    )
}

const mapStateToProps = (state:any) =>({
    Name:state.WorkspaceReducer.Name,
})


export default connect(mapStateToProps, {UpdateWorkspaceTitle,SetWorkspaceTitle})(TitleWorkspaceElement);