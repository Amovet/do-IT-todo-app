import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ALL_TODO_TYPE, IMMEDIATE_TODO_TYPE, LATEST, TODO, TODO_WITH_DATE} from "../../Constants/Constants";
import WorkspaceItem from "../../components/Workspace/Workspace_item";
import loader from "../../assets/img/Loader.svg";
import {GetAllTodo, GetUpcomingTodo, TodoInitialState} from "../../redux/Todo-reducer";
import ImmediateIco from '../../assets/img/Immediate.svg'
import AllTodoIco from '../../assets/img/allTodo.svg'

interface GetTodosByTypeProps {
    Todo: TodoInitialState,
    loading: boolean,
    GetUpcomingTodo: (type: string) => void,
    type: string,
    GetAllTodo: () => void,
}

const GetTodosByType = ({Todo, loading, GetUpcomingTodo, type, GetAllTodo}: GetTodosByTypeProps) => {
    const [maxNumb, setMaxNumb] = useState(5);

    let todoArr
    let typeForItems: string
    if (type == IMMEDIATE_TODO_TYPE) {
        todoArr = Todo.upcomingTodo
        typeForItems = TODO_WITH_DATE
    } else {
        todoArr = Todo.allTodo
        typeForItems = TODO
    }

    useEffect(() => {
        if (type == IMMEDIATE_TODO_TYPE) {
            GetUpcomingTodo(LATEST)
        }
        if (type == ALL_TODO_TYPE) {
            GetAllTodo()
        }
    }, [])

    let massageForEmptyArr = () => {
        if (type == IMMEDIATE_TODO_TYPE) {
            if (Todo.upcomingTodo.length < 1) {
                return <div className='main-page__block-info'>So far, not a single task with an end time has been added
                    yet</div>
            }
        }
        if (type == ALL_TODO_TYPE) {
            if (Todo.allTodo.length < 1) {
                return <div className='main-page__block-info'>So far, not a single task has been added yet</div>
            }
        }
    }

    let todoElements = todoArr.slice(0, maxNumb).map((e: any) =>
        <WorkspaceItem key={e._id} title={e.title} id={e._id} endTime={e.endTime} createdAt={e.createdAt}
                       description={''} type={typeForItems}/>
    )
    let editMaxNub = () => {
        if (maxNumb + 5 < todoArr.length) {
            setMaxNumb(maxNumb + 5)
        } else {
            setMaxNumb(todoArr.length)
        }
    }

    return (
        <>
            <div className="main-page__block-title small-title">
                <img src={type == IMMEDIATE_TODO_TYPE ? ImmediateIco : AllTodoIco} alt=""/>
                {type == IMMEDIATE_TODO_TYPE ? "Immediate todo" : "All todo"}
            </div>
            {loading ?
                <div className='main-page__load'>
                    <div className="main-page__load-container">
                        <img src={loader} alt=""/>
                        <div
                            className='workspace__load-title'>{type == IMMEDIATE_TODO_TYPE ? "Load immediate todos" : "Load all todo"}Load
                            more
                        </div>
                    </div>
                </div>
                :
                <>
                    <div className='main-page__elem-container'>
                        {massageForEmptyArr()}
                        {todoElements}
                    </div>
                    {todoArr.length > maxNumb ?
                        <div onClick={() => editMaxNub()} className='workspace__view-all'>Load more </div>
                        :
                        <>
                            {todoArr.length > 5 ?
                                <>
                                    <div onClick={() => setMaxNumb(5)} className='workspace__view-all'>Hide</div>
                                </>
                                : null
                            }
                        </>
                    }
                </>
            }
        </>
    );
}


const mapStateToProps = (state: any) => ({
    Todo: state.TodoReducer,
    loading: state.SettingsReducer.LoadingAllTodo,

})

export default connect(mapStateToProps, {GetUpcomingTodo, GetAllTodo})(GetTodosByType);