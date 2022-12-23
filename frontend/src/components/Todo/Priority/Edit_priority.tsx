import React from "react";
import {connect} from "react-redux";
import {UpdatePriority} from "../../../redux/Todo-reducer";
import {PRIORITY, TODO_IMPORTANCE} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";

interface TodoInitial {
    UpdatePriority: (value: string) => void,
    PriorityMenu: any
}

function EditPriority({UpdatePriority, PriorityMenu}: TodoInitial) {


    let PriorityLvl =
        PRIORITY.map((e: string) => {
            return (
                <div onClick={() => UpdatePriority(e)} className='setting-popup-menu__elem' key={e}>
                    {e}
                </div>
            )
        })

    return (
        <OutsideAlerter type={TODO_IMPORTANCE} PriorityMenu={PriorityMenu}>
            <div className='setting-popup-menu'>{PriorityLvl}</div>
        </OutsideAlerter>
    )
}


export default connect(null, {UpdatePriority})(EditPriority);
;