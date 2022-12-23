import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {AddWorkspace, setBoards, UpdateBoards} from "../../../redux/Workspaces-reducer";
import {DEVELOPMENT, DONE, QUEUE, TODO_VALIDATION} from "../../../Constants/Constants";
import {
    InitNewTodo,
    OpenTodo,
    SetInitStatus,
    SetInitTodo,
    SetStatus,
    TodoTitleValidation
} from "../../../redux/Todo-reducer";
import OutsideAlerter from "../../../hoc/Detect-click"
import {SetInitTitle} from "../../../redux/Todo-reducer";

interface BoardsElementProps{
    newTodo:InitNewTodo,
    SetInitTodo:(board:any)=>void,
    UpdateBoards:(id:string|undefined,board:any)=>void,
    Boards:Array<any>,
    setBoards:(boards:any)=>void,
    SetInitTitle:(value:string)=>void,
    title:string,
    TodoTitleValidation:()=>void,
    OpenTodo:(id:number)=>void,
    SetStatus:(title:string,id:string)=>void

}

function BoardsElement({
                           newTodo,
                           SetInitTodo,
                           UpdateBoards,
                           Boards,
                           setBoards,
                           SetInitTitle,
                           title,
                           TodoTitleValidation,
                           OpenTodo,
                           SetStatus
                       }: BoardsElementProps) {
    const [b, setB] = useState<any>([
        {id: 1, title: QUEUE, items: []},
        {id: 2, title: DEVELOPMENT, items: []},
        {id: 3, title: DONE, items: []}
    ]);

    const [currentBoard, setCurrentBoard] = useState<any>(null);
    const [currentItem, setCurrentItem] = useState<any>(null);
    const {id} = useParams();

    const todoRef = useRef<any>();


    useEffect(() => {
        setB(Boards)
    }, [Boards])

    function dragOverHandler(e: any, board?: any) {
        e.preventDefault()
        if (e.target.className == 'item-container') {
            e.target.style.boxShadow = ' 0px -45px 0px 0px rgba(169, 171, 172, 0.2) inset'
            e.target.style.paddingBottom = '100px'
        }
    }

    function dragLeaveHandler(e: any) {
        if (e.target.className == 'item-container') {
            e.target.style = 'none'
        }

    }

    function dropCardHandler(e: any, board: any) {
        if (e.target.className !== 'table__add-todo') {
            if (board.items.length == 0) {
                board.items.push(currentItem)
                const currentIndex = currentBoard.items.indexOf(currentItem)
                if (currentIndex >= 0) {
                    currentBoard.items.splice(currentIndex, 1)
                }
                setBoards(Boards.map((b: any) => {
                    if (b.title === board.title) {
                        return board
                    }
                    if (b.title === currentBoard.title) {
                        return currentBoard
                    }
                    return b
                }))
                SetStatus(board.title, currentItem._id)
                UpdateBoards(id, b)
            }
        }
        if (e.target.className == 'item-container') {
            e.target.style = 'none'
        }

    }

    function dragStartHandler(e: any, board: any, item: any) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: any) {
        if (e.target.className == 'item-container') {
            e.target.style = 'none'
        }

    }

    function dropHandler(e: any, board: any, item: any) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)

        setBoards(Boards.map((b: any) => {
            if (b.title === board.title) {
                return board
            }
            if (b.title === currentBoard.title) {
                return currentBoard
            }
            return b
        }))
        if (e.target.className == 'item-container') {
            e.target.style = 'none'
        }
        SetStatus(board.title, item._id)
        UpdateBoards(id, b)
    }

    let addNewTodo = (board: any) => {
        if (newTodo.added == false) {
            SetInitTodo(board)
            b.forEach((e: any) => {
                    if (e.title == board) {
                        let updBoards = b
                        updBoards[b.indexOf(e)] = {...e, items: [{...newTodo, AddTitle: false, _id: '000'},...e.items]}
                        setB(updBoards)
                    }
                }
            )
        }
    }

    const onChange = (e: any) => SetInitTitle(e.target.value);


    return (<>
            {
                b !== null ? b.map((board: any) =>
                    <div className='table'
                         key={board.title}
                         onDragOver={(e: any) => newTodo.added ? null : dragOverHandler(e, board)}
                         onDrop={(e: any) => newTodo.added ? null : dropCardHandler(e, board)}
                    >
                        <div className='table__title'>{board.title}</div>
                        <div className='table__container'>
                            {board.items.map((item: any) => {

                                return (
                                    <div
                                        key={item._id}
                                        draggable={newTodo.added ? false : true}
                                        onDragOver={(e: any) => newTodo.added ? null : dragOverHandler(e)}
                                        onDragLeave={(e: any) => newTodo.added ? null : dragLeaveHandler(e)}
                                        onDragStart={(e: any) => newTodo.added ? null : dragStartHandler(e, board, item)}
                                        onDragEnd={(e: any) => newTodo.added ? null : dragEndHandler(e)}
                                        onDrop={(e: any) => newTodo.added ? null : dropHandler(e, board, item)}
                                        className={item.AddTitle == undefined ? 'item-container' : 'item-container-create'}
                                        ref={todoRef}
                                    >
                                        {item.AddTitle == undefined ?
                                            <div className='item' onClick={() => OpenTodo(item._id)}>{item.title}</div>
                                            :
                                            <OutsideAlerter type={TODO_VALIDATION} b={b}>
                                                <input type='text' name='title'
                                                       onKeyDown={(e: any) => e.keyCode == 13 ? TodoTitleValidation() : null}
                                                       className='item' value={title} onChange={e => onChange(e)}
                                                       placeholder="Enter your todo" required minLength={5}/>
                                            </OutsideAlerter>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        {board.items < 1 ?
                            <div className='table__info'>At the moment, the table {board.title} is empty</div> : null}
                        <div className='table__add-todo' onClick={() => addNewTodo(board.title)}><p className='plus'/>
                            <span className='table__add-todo-title'>ADD TODO</span></div>
                    </div>
                ) : null
            }
        </>

    )
}

const mapStateToProps = (state: any) => ({
    Name: state.WorkspaceReducer.Name,
    Description: state.WorkspaceReducer.Description,
    Boards: state.WorkspaceReducer.Boards,
    loading: state.WorkspaceReducer.Loading,
    title: state.TodoReducer.initNewTodo.title,
    newTodo: state.TodoReducer.initNewTodo,
})


export default connect(mapStateToProps, {
    AddWorkspace,
    UpdateBoards,
    setBoards,
    SetInitStatus,
    SetInitTitle,
    SetInitTodo,
    TodoTitleValidation,
    OpenTodo,
    SetStatus
})(BoardsElement);