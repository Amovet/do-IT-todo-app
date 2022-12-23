import React from "react";
import {connect} from "react-redux";

interface ErrPageInitial{
    errMsg:string,
}

function ErrPage({errMsg}:ErrPageInitial){
    return(
       <>
           {errMsg!==null?
               <div className='err-page'>
                    <div>{errMsg}</div>
               </div>
               :null}
       </>
    )
}

const mapStateToProps = (state:any) =>({
    errMsg:state.SettingsReducer.Err,
})


export default connect(mapStateToProps, null)(ErrPage);;