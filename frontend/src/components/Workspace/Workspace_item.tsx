import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TODO, TODO_WITH_DATE} from "../../Constants/Constants";
import {OpenTodo} from "../../redux/Todo-reducer";
import {formatISO, intervalToDuration} from "date-fns";

interface ItemProps {
    title: string,
    description: string,
    id: string,
    type?: string,
    OpenTodo: (id:any)=>void,
    endTime?: any,
    createdAt?: any,
    status?: string
}

function WorkspaceItem({title, description, id, type, OpenTodo, endTime, createdAt, status}: ItemProps) {
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    let initDate: any


    useEffect(() => {
        if (type == TODO_WITH_DATE) {
            ValidateDate()
        }
    }, []);


    let ValidateDate = () => {
        initDate = intervalToDuration({
            start: new Date(createdAt),
            end: new Date(endTime)
        })
        if (initDate.years == 0) {
            setDate(`
            ${initDate.months !== 0 ? `${initDate.months} months` : ''} 
            ${initDate.days !== 0 ? `${initDate.days} days` : ''} 
            ${initDate.days == 0 && initDate.months == 0 ? `${initDate.hours} hours` : ''}`
            )
        } else {
            setDate('more then year')
        }
    }

    return (
        <div className='workspace-item'
             onClick={() => type == TODO || type == TODO_WITH_DATE ? OpenTodo(id) : navigate(`/workspace/${id}`)}>
            <div className='workspace-item__title-container'>
                <div className='workspace-item__title'>
                    {title}
                    {status ?
                        <div className='workspace-item__status sub'>Status: {status}</div>
                        :
                        null}
                </div>
                {type == TODO_WITH_DATE ?
                    <div className='workspace-item__date sub'>
                        <span>Will end in </span>
                        {date}
                    </div>
                    :
                    null}
                {type == TODO ?
                    <div className='workspace-item__date sub'>
                        <span>Create at </span>
                        {createdAt !== undefined ?
                            <>{formatISO(new Date(createdAt), {representation: 'date'})}</>
                            : null}
                    </div>
                    :
                    null}

            </div>
            <div className='workspace-item__description'>
                {description}
            </div>
        </div>
    )
}


export default connect(null, {OpenTodo})(WorkspaceItem);