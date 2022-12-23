import React, { useRef, useEffect } from "react";
import {
    TODO_IMPORTANCE,
    TODO_STATUS,
    TODO_UPDATE_DESCRIPTION,
    TODO_UPDATE_ENDTIME,
    TODO_VALIDATE_AND_UPDATE_TITLE,
    TODO_VALIDATION,
    VIEW_MORE,
    WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION,
    WORKSPACE_VALIDATE_AND_UPDATE_TITLE
} from "../Constants/Constants";
import {connect} from "react-redux";
import {
    SetEditEndDateFalse, SetEditPriority, SetEditStatus,
    SetUpdateDescription,
    TODO_UPDATE_SUBTASK,
    TodoSubtaskValidation, TodoTitleUpdate,
    TodoTitleValidation
} from "../redux/Todo-reducer";
import {SetViewMore, SetWorkspaceDescription, SetWorkspaceTitle} from "../redux/Workspaces-reducer";


function useOutsideTodo(ref:any,type:any,TodoTitleValidation:any,newDescription:any,
   id:any,SetUpdateDescription:any,TodoSubtaskValidation:any,TodoTitleUpdate:any,
   SetEditEndDateFalse:any,AddEndTimeButtonRef:any,PriorityMenu:any,SetEditPriority:any,
   SetWorkspaceTitle:any,SetWorkspaceDescription:any,SetViewMore:any,StatusMenu:any,SetEditStatus:any) {

    useEffect(() => {
        let handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if(TODO_VALIDATION==type){
                    TodoTitleValidation()
                }
                if(TODO_UPDATE_DESCRIPTION==type){
                    SetUpdateDescription()
                }
                if(TODO_VALIDATE_AND_UPDATE_TITLE==type){
                    TodoTitleUpdate()
                }
                if(WORKSPACE_VALIDATE_AND_UPDATE_TITLE==type){
                    SetWorkspaceTitle()
                }
                if(WORKSPACE_VALIDATE_AND_UPDATE_DESCRIPTION==type){
                    SetWorkspaceDescription()
                }
                if(TODO_UPDATE_SUBTASK==type){
                    TodoSubtaskValidation(id)
                }
                if(VIEW_MORE==type){
                    SetViewMore(false)
                }
                if(TODO_UPDATE_ENDTIME==type && !AddEndTimeButtonRef.current.contains(event.target)){
                        SetEditEndDateFalse()
                }
                if(TODO_IMPORTANCE==type  && !PriorityMenu.current.contains(event.target)){
                    SetEditPriority(false)
                }
                if(TODO_STATUS==type  && !StatusMenu.current.contains(event.target)){
                    SetEditStatus(false)
                }
            }

        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


function OutsideAlerter({children,type,TodoTitleValidation,
    newDescription,id,SetUpdateDescription,TodoSubtaskValidation,
    TodoTitleUpdate,SetEditEndDateFalse,AddEndTimeButtonRef,
    PriorityMenu,SetEditPriority,SetWorkspaceTitle,
    SetWorkspaceDescription,SetViewMore,StatusMenu,SetEditStatus}:any) {
        const wrapperRef = useRef(null);
        useOutsideTodo(wrapperRef,type,TodoTitleValidation,newDescription,
        id,SetUpdateDescription,TodoSubtaskValidation,TodoTitleUpdate,
        SetEditEndDateFalse,AddEndTimeButtonRef,PriorityMenu,SetEditPriority,
        SetWorkspaceTitle,SetWorkspaceDescription,SetViewMore,StatusMenu,SetEditStatus,);
    return <div ref={wrapperRef} >{children}</div>;
}


export default connect(null, {TodoTitleValidation,SetUpdateDescription,TodoSubtaskValidation,TodoTitleUpdate,SetEditEndDateFalse,SetEditPriority,SetWorkspaceTitle,SetWorkspaceDescription,SetViewMore,SetEditStatus})(OutsideAlerter)