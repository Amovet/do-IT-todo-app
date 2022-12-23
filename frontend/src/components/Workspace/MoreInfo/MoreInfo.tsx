import React from "react";
import {connect} from "react-redux";
import {VIEW_MORE} from "../../../Constants/Constants";
import OutsideAlerter from "../../../hoc/Detect-click";
import {formatISO} from "date-fns";


interface MoreInfoElementProps{
    DataCreate:string,
    DataUpdate:string,
}

function MoreInfoElement({DataCreate,DataUpdate}:MoreInfoElementProps){


    return(
        <OutsideAlerter type={VIEW_MORE}>
            <div className='workspace__menu-more'>
                <div>
                    <span>Create at: </span> {formatISO(new Date(DataCreate), { representation: 'date' })}
                </div>
                <div>
                    <span>Update at: </span> {formatISO(new Date(DataUpdate), { representation: 'date' })}
                </div>
            </div>
        </OutsideAlerter>
    )
}

const mapStateToProps = (state:any) =>({
    DataCreate:state.WorkspaceReducer.DataCreate,
    DataUpdate:state.WorkspaceReducer.DataUpdate,
})


export default connect(mapStateToProps, null)(MoreInfoElement);