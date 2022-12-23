import React from "react";
import {connect} from "react-redux";
import { UpdateBoardsAfterChangeStatus} from "../../../redux/Todo-reducer";
import { STATUS,  TODO_STATUS} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";

interface TodoInitial{
    UpdateBoardsAfterChangeStatus:(value:string)=>void,
    StatusMenu:any,
    status:string
}

function EditStatus({UpdateBoardsAfterChangeStatus,StatusMenu,status}:TodoInitial){


    let StatusArr =
        STATUS.map((e:string)=>{
            if(e!==status){
            return(
                <div onClick={()=>UpdateBoardsAfterChangeStatus(e)}  className='setting-popup-menu__elem' key={e}>
                    {e}
                </div>
            )
        }
        })
    return(
        <OutsideAlerter type={TODO_STATUS} StatusMenu={StatusMenu}>
            <div className='setting-popup-menu'>{StatusArr}</div>
        </OutsideAlerter>
    )
}

const mapStateToProps = (state:any) =>({
    status: state.TodoReducer.status,
})

export default connect(mapStateToProps, {UpdateBoardsAfterChangeStatus})(EditStatus);;