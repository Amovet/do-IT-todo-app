import React, {useEffect,useState} from "react";
import {connect} from "react-redux";
import WorkspaceItem from "../../components/Workspace/Workspace_item";
import {GetUpcomingTodo, TodoInitialState} from "../../redux/Todo-reducer";
import {LATEST, SORT, TODO_WITH_DATE} from "../../Constants/Constants";
import loader from "../../assets/img/Loader.svg";

interface UpcomingProps {
    Todo: TodoInitialState,
    loading:boolean,
    GetUpcomingTodo:(type:string)=>void

}

function WorkspaceAll({Todo,loading,GetUpcomingTodo}:UpcomingProps){
    const [maxNumb, setMaxNumb] = useState(10);
    const [viewDropDownMenu, setViewDropDownMenu] = useState(false);

    useEffect(()=>{
        GetUpcomingTodo(LATEST)
    },[])

    let todoElements = Todo.upcomingTodo.slice(0,maxNumb).map((e:any) =>
        <WorkspaceItem key={e._id} title={e.title} id={e._id} endTime={e.endTime} createdAt={e.createdAt} description={''} type={TODO_WITH_DATE} status={e.status}/>
    )
    let editMaxNub = () =>{
        if(maxNumb+10<Todo.upcomingTodo.length){setMaxNumb(maxNumb+10)}
        else{setMaxNumb(Todo.upcomingTodo.length)}
    }

    let sortElement = SORT.map((e:any) => <div key={e} onClick={()=>GetUpcomingTodo(e)}>{e}</div>)

    return(
        <>
            {loading?
                <section className='workspace'>
                    <div className='workspace__load'>
                        <div className='workspace__load-container'>
                            <img src={loader} alt="" className='workspace__loader'/>
                            <div className='workspace__load-title'>Load upcoming todos</div>
                        </div>
                    </div>
                </section>
                :
                <div className='workspace'>
                    <div className='workspace__container'>
                        <div className='workspace__title-container'>
                            <div className='workspace__title'>
                                <div>Upcoming todo's</div>
                                <div className='workspace__filter' onClick={()=>setViewDropDownMenu(!viewDropDownMenu)}>
                                    sortBy
                                </div>
                                {viewDropDownMenu?
                                    <div className='workspace__menu-filter'>
                                        {sortElement}
                                    </div>
                                    :
                                null
                                }
                            </div>
                        </div>
                        {todoElements}
                        {Todo.upcomingTodo.length<1?
                            <div className='workspace__info'>
                                So far, not a single task with an end time has been added yet
                            </div>
                            :
                        null}
                        {Todo.upcomingTodo.length>maxNumb?<div onClick={()=>editMaxNub()} className='workspace__view-all'>Load more</div>:null}
                    </div>
                </div>
            }
        </>
    )
}
const mapStateToProps = (state:any) =>({
    Todo: state.TodoReducer,
    loading: state.SettingsReducer.LoadingAllTodo,
})


export default connect(mapStateToProps, {GetUpcomingTodo})(WorkspaceAll);