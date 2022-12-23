import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import WorkspaceItem from "../../components/Workspace/Workspace_item";
import {GetAllTodo, TodoInitialState} from "../../redux/Todo-reducer";
import {TODO} from "../../Constants/Constants";
import loader from "../../assets/img/Loader.svg";

interface WorkspaceAllProps{
    Todo:TodoInitialState,
    loading:boolean,
    GetAllTodo:()=>void
}


function WorkspaceAll({Todo, loading, GetAllTodo}: WorkspaceAllProps) {
    const [maxNumb, setMaxNumb] = useState(10);

    useEffect(() => {
        GetAllTodo()
    }, [])

    let todoElements = Todo.allTodo.slice(0, maxNumb).map((e: any) =>
        <WorkspaceItem key={e._id} title={e.title} id={e._id} description={''} type={TODO} createdAt={e.createdAt}
                       status={e.status}/>
    )
    let editMaxNub = () => {
        if (maxNumb + 10 < Todo.allTodo.length) {
            setMaxNumb(maxNumb + 10)
        } else {
            setMaxNumb(Todo.allTodo.length)
        }
    }

    return (
        <>
            {loading ?
                <section className='workspace'>
                    <div className='workspace__load'>
                        <div className='workspace__load-container'>
                            <img src={loader} alt="" className='workspace__loader'/>
                            <div className='workspace__load-title'>Load all todos</div>
                        </div>
                    </div>
                </section>
                :
                <section className='workspace'>
                    <div className='workspace__container'>
                        <div className='workspace__title-container'>
                            <div className='workspace__title'>
                                <div>Your todo's</div>
                            </div>
                        </div>
                        {Todo.allTodo.length < 1 ?
                            <div className='workspace__info'>
                                So far, not a single task has been added yet
                            </div>
                            :
                            null}
                        {todoElements}
                        {Todo.allTodo.length > maxNumb ?
                            <div onClick={() => editMaxNub()} className='workspace__view-all'>Load more</div> : null}
                    </div>
                </section>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    Todo: state.TodoReducer,
    loading: state.SettingsReducer.LoadingAllTodo
})


export default connect(mapStateToProps, {GetAllTodo})(WorkspaceAll);