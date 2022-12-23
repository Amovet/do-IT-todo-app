import React from "react";
import {connect} from "react-redux";
import {
    UpdateTitle,
    TodoTitleUpdate,
} from "../../../redux/Todo-reducer";
import {TODO_VALIDATE_AND_UPDATE_TITLE} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";


interface TitleInitial {
    title: string,
    UpdateTitle: (value:string)=>void,
    TodoTitleUpdate: ()=>void,
}

function TitleElement({title, UpdateTitle, TodoTitleUpdate}: TitleInitial) {

    const onChange = (e: any) => {
        UpdateTitle(e.target.value)
    }

    return (
        <OutsideAlerter type={TODO_VALIDATE_AND_UPDATE_TITLE}>
            <input type='text' name='title'
                   onKeyDown={(e: any) => e.keyCode == 13 ? TodoTitleUpdate() : null}
                   className='header-block__title medium-title'
                   value={title}
                   onChange={e => onChange(e)}
                   placeholder="Enter your title"
                   minLength={10}/>
        </OutsideAlerter>
    )
}

const mapStateToProps = (state: any) => ({
    title: state.TodoReducer.title,
})


export default connect(mapStateToProps, {UpdateTitle, TodoTitleUpdate})(TitleElement);