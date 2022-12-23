import React from "react";
import {connect} from "react-redux";
import {UpdateEndTime} from "../../../redux/Todo-reducer";
import {TODO_UPDATE_ENDTIME} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";
import {endOfDay, format} from "date-fns";

interface EditDateInitial {
    UpdateEndTime: any,
    AddEndTimeButtonRef: any
}

function EditDate({UpdateEndTime, AddEndTimeButtonRef}: EditDateInitial) {


    const onSubmit = (e: any) => {
        e.preventDefault();
        UpdateEndTime(format(endOfDay(new Date(e.target.date.value)), "yyyy-MM-dd'T'HH:mm:ss'Z'"))
    };

    return (
        <OutsideAlerter type={TODO_UPDATE_ENDTIME} AddEndTimeButtonRef={AddEndTimeButtonRef}>
            <form onSubmit={e => onSubmit(e)} className='input-end-date'>
                <div className='input-end-date__title'>Select todo's end time:</div>
                <input className='input-end-date__input' type="date" name='date'
                       min={format(new Date(), 'yyyy-MM-dd')}/>
                <button type='submit' className='input-end-date__button'>Add end data</button>
            </form>
        </OutsideAlerter>
    )
}


export default connect(null, {UpdateEndTime})(EditDate);
;