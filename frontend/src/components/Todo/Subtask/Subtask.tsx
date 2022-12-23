import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {
    addNewSubtask,
    TODO_UPDATE_SUBTASK,
    putSubtaskTitleInState,
    SetCheckedSubtask,
    DeleteSubtask,
    TodoSubtaskValidation, TodoInitialState,
} from "../../../redux/Todo-reducer";
import OutsideAlerter from "../../../hoc/Detect-click";



interface SubtaskInitial{
    id:string,
    subtasks:Array<object>,
    addNewSubtask:any,
    putSubtaskTitleInState:(value:string,id:string)=>void,
    SetCheckedSubtask:(id:string)=>void,
    TodoReducer:TodoInitialState,
    DeleteSubtask:(id:string)=>void,
    TodoSubtaskValidation:(id:string)=>void
}

function SubtaskElement({id,subtasks,addNewSubtask,putSubtaskTitleInState,SetCheckedSubtask,TodoReducer,DeleteSubtask,TodoSubtaskValidation}:SubtaskInitial){

    const [Subtasks, setSubtasks] = useState(subtasks);

    useEffect(()=>{
        setSubtasks(subtasks)
    },[TodoReducer])

    const onChange = (e:any) =>
    {
        if(e.target.name=='subtask') {
            putSubtaskTitleInState(e.target.value,e.target.id)
        }
    }

    let SubtaskItems = Subtasks.map((e:any)=>{
        return(
            e._id!=='000'?
                <div className={`subtasks-container__subtask ${JSON.parse(e.isDone)?'task-done':''}`} key={e._id}>
                    <div>
                        <input type="checkbox" checked={JSON.parse(e.isDone)} onChange={()=>SetCheckedSubtask(e._id)}/>
                        <span className='subtasks-container__subtask-title' >{e.title}</span>
                    </div>
                    {JSON.parse(e.isDone)?
                        <div className='exit-container' onClick={()=>DeleteSubtask(e._id)}>
                            <div className='exit'/>
                        </div>
                        :
                        null
                    }

                </div>
                :
                <OutsideAlerter type={TODO_UPDATE_SUBTASK} key={e._id} id={e._id}>
                    <input  key={e._id} name='subtask'
                            className="subtasks-container__subtask"
                            value={e.title} onChange={e=> onChange(e)}
                            placeholder="Enter your subtask" id={e._id}
                            //id=000 because it is initial id
                            onKeyDown={(e: any) => e.keyCode == 13 ? TodoSubtaskValidation('000') : null}
                            minLength={5}/>
                </OutsideAlerter>
        )})


    return (
        <div className="main-block__subtasks-container subtasks-container">
            <div className="subtasks-container__title small-title">Subtasks:</div>
                {SubtaskItems}
            <div className="subtasks-container__add" onClick={() => addNewSubtask(id)}>
                + Add new subtask
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) =>({
    id:state.TodoReducer.id,
    subtasks:state.TodoReducer.subtasks,
    TodoReducer:state.TodoReducer,
})


export default connect(mapStateToProps, {addNewSubtask,putSubtaskTitleInState,SetCheckedSubtask,DeleteSubtask,TodoSubtaskValidation})(SubtaskElement);