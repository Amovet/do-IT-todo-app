import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import { SetWindowsViewFalse} from "../../redux/Settings-reducer";
import {SetEditTitle, DeleteTodo, TodoInitialState} from "../../redux/Todo-reducer";
import subTaskIco from "../../assets/img/subTask.svg"
import EndTimeIco from "../../assets/img/EndTime.svg"
import PriorityIco from "../../assets/img/priority.svg"
import SubtaskElement from "../Todo/Subtask/Subtask"
import {SetEditDescription} from "../../redux/Todo-reducer";
import deleteIco from '../../assets/img/delete_ico.svg'
import filesIco from '../../assets/img/filesIco.svg'
import statusIco from '../../assets/img/status.svg'
import CommentElement from "./Comments/Comments";
import AddFilesElement from "./Add_files/Add_files";
import EditDate from "./Date/Edit_date";
import EditPriority from "./Priority/Edit_priority";
import DateElement from "./Date/Date";
import TitleElement from "./Title/Title";
import DescriptionElement from "./Description/Description";
import EditStatus from "./Status/Edit_status";

interface TodoInitial{
    title:string,
    subtasks:Array<object>,
    description:string|undefined,
    endTime:string,
    importance:string|undefined,
    filesUrl:Array<string>|undefined,
    status:string,
    SetWindowsViewFalse:()=>void,
    editTitle:string,
    SetEditTitle:(value:boolean)=>void,
    editDescription:(value:string)=>void,
    SetEditDescription:(value:boolean)=>void,
    TodoReducer:any,
    DeleteTodo:()=>void,
}

function ViewTodo({title,description,
endTime,importance,filesUrl,status,subtasks,
SetWindowsViewFalse,editTitle,SetEditTitle,
editDescription, SetEditDescription,TodoReducer,DeleteTodo}:TodoInitial){

    const [subtasksView, setSubtasksView] = useState(false);
    const [addEndData, setAddEndData] = useState(false);
    const [addPriority, setAddPriority] = useState(false);
    const [addFiles, setAddFiles] = useState(false);
    const [editStatus, setEditStatus] = useState(false);


    useEffect(()=>{
        if(subtasks.length>0){setSubtasksView(true)}
        setAddEndData(TodoReducer.EditTodo.editDataEnd)
        setAddPriority(TodoReducer.EditTodo.editImportance)
        setEditStatus(TodoReducer.EditTodo.status)
    },[TodoReducer])


    const AddEndTimeButtonRef = useRef(null)
    const PriorityMenu = useRef(null)
    const AddFileMenu = useRef(null)
    const StatusMenu = useRef(null)


    return(
    <div className='todo-window'>
        <div className='todo-window__header header-block'>
                {!editTitle?
                    <div className='header-block__title medium-title' onClick={()=>SetEditTitle(true)}>
                         {title}
                    </div>
                    :
                    <TitleElement/>
                }
                <div className='header-block__subtitle sub'>
                    Status:
                    <span className='main'>
                        {status}
                    </span>
                </div>
                {importance?<div className='header-block__subtitle sub'>Priority: {importance}</div>:null}
                <DateElement/>
                <div className="header-block__exit" onClick={()=>SetWindowsViewFalse()}>
                    <div className='exit-window'/>
                </div>
        </div>
        <div className="todo-window__main-block main-block">
            <div className="main-block__description-and-comment">
                <div className="main-block__description description">
                        <div className="description__title small-title">Description:</div>
                        {!editDescription?
                        <div className="description__text" onClick={()=>SetEditDescription(true)}>
                            {description?description:"Add a description to todo"}
                        </div>
                        :
                        <DescriptionElement/>
                        }
                </div>
                {subtasksView?<SubtaskElement />:null}
                <CommentElement/>
            </div>
            <div className='main-block__settings settings'>
                {!subtasksView?<div className="settings__elem" onClick={()=>setSubtasksView(true)}>
                    <img src={subTaskIco} alt="" className="settings__elem-img"/>
                    <span>Add subtasks</span>
                </div>
                    :
                    null}
                <div className="settings__elem" onClick={()=>setAddEndData(!addEndData)} ref={AddEndTimeButtonRef}>
                    <img src={EndTimeIco} alt="" className="settings__elem-img"/>
                    {endTime?'Edit ':'Add '}  <span>end time</span>
                </div>
                    {addEndData?<EditDate AddEndTimeButtonRef={AddEndTimeButtonRef}/> : null}
                <div className="settings__elem" onClick={()=>setAddPriority(!addPriority)} ref={PriorityMenu}>
                    <img src={PriorityIco} alt="" className="settings__elem-img"/>
                    <span>Add priority</span>
                </div>
                    {addPriority? <EditPriority PriorityMenu={PriorityMenu}/>: null}
                <div className="settings__elem" onClick={()=>setEditStatus(!editStatus)} ref={StatusMenu}>
                    <img src={statusIco} alt="" className="settings__elem-img"/>
                    <span>Edit status</span>
                </div>
                    {editStatus? <EditStatus StatusMenu={StatusMenu}/>: null}
                <div className="settings__elem" onClick={()=>setAddFiles(!addFiles)} ref={AddFileMenu}>
                    <img src={filesIco} alt="" className="settings__elem-img"/>
                    {filesUrl==undefined||filesUrl.length<1?'Add':'View'} files
                </div>
                    {addFiles? <AddFilesElement /> : null}
                <div className="settings__elem" onClick={()=>DeleteTodo()}>
                    <img src={deleteIco} alt="" className="settings__elem-img"/>
                    <span>Delete task</span>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state:any) =>({
    title:state.TodoReducer.title,
    subtasks:state.TodoReducer.subtasks,
    description:state.TodoReducer.description,
    endTime:state.TodoReducer.endTime,
    importance:state.TodoReducer.importance,
    filesUrl:state.TodoReducer.filesUrl,
    status:state.TodoReducer.status,
    editTitle:state.TodoReducer.EditTodo.editTitle,
    editDescription:state.TodoReducer.EditTodo.editDescription,
    TodoReducer:state.TodoReducer,
})


export default connect(mapStateToProps, {SetWindowsViewFalse,SetEditTitle,SetEditDescription,DeleteTodo})(ViewTodo);;