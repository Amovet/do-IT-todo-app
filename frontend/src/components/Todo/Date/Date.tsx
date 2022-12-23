import React from "react";
import {connect} from "react-redux";
import {formatISO, intervalToDuration} from "date-fns";

interface TodoInitial {
    endTime: string,
    createdAt: string,
}

function DateElement({endTime, createdAt}: TodoInitial) {

    let daysLeft: any

    if (endTime) {
        daysLeft = intervalToDuration({
            start: new Date(createdAt),
            end: new Date(endTime)
        })
    }

    return (
        <div className='header-block__subtitle sub'>
            Create at:<span className='main'>
                            {formatISO(new Date(createdAt), {representation: 'date'})}
                      </span>
            {endTime ?
                <>
                    <span> End time:</span>
                    <span className='main'>
                            {formatISO(new Date(endTime), {representation: 'date'})}
                    </span>
                </>
                : null}
            {endTime ?
                <>
                    {daysLeft.months ? `Month left: ${daysLeft.months}` : null}
                    <span> Day left:</span><span className='main'>{daysLeft.days}</span>
                </>
                : null}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    endTime: state.TodoReducer.endTime,
    createdAt: state.TodoReducer.createdAt,
})


export default connect(mapStateToProps, null)(DateElement);
;