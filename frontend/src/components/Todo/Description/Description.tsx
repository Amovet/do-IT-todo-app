import React, {useState} from "react";
import {connect} from "react-redux";
import {
    SetUpdateDescription,
    TodoTitleValidation,
    UpdateDescription
} from "../../../redux/Todo-reducer";
import {TODO_UPDATE_DESCRIPTION,} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";

import {SetEditDescription} from "../../../redux/Todo-reducer";


interface TodoInitial {
    id: string,
    description: string | undefined,
    UpdateDescription: (description: string) => void,
    SetUpdateDescription: () => void,
}

function DescriptionElement({id, description, UpdateDescription, SetUpdateDescription}: TodoInitial) {
    const [characterLeft, setCharacterLeft] = useState(600);

    const onChange = (e: any) => {
        UpdateDescription(e.target.value)
        setCharacterLeft(e.target.maxLength - e.target.value.length)
    }

    return (
        <OutsideAlerter type={TODO_UPDATE_DESCRIPTION} id={id}>
            <textarea name='description'
                      onKeyDown={(e: any) => e.keyCode == 13 ? SetUpdateDescription() : null}
                      className='description__text'
                      value={description}
                      onChange={e => onChange(e)}
                      maxLength={600}
                      placeholder="Enter your description"
                      minLength={10}/>
            {characterLeft < 585 ?
                <div className='description__length sub'>
                    Character left: {characterLeft}
                </div>
                : null}
        </OutsideAlerter>
    )
}

const mapStateToProps = (state: any) => ({
    id: state.TodoReducer.id,
    description: state.TodoReducer.description,
})


export default connect(mapStateToProps, {
    TodoTitleValidation,
    SetEditDescription,
    UpdateDescription,
    SetUpdateDescription
})(DescriptionElement);