import React, {useState} from "react";
import {connect} from "react-redux";
import {
    UploadFiles,
    DeleteFiles
} from "../../redux/Todo-reducer";
import {UploadBackground} from "../../redux/Workspaces-reducer";
import {LOAD_USER_IMG, LOAD_WORKSPACE_BACKGROUND} from "../../Constants/Constants";
import {UploadUserPhoto} from "../../redux/Auth-reducer";


interface AddFilesInitial {
    UploadBackground: any,
    type: string,
    UploadUserPhoto: any,
}

function AddFilesElement({ UploadBackground, type, UploadUserPhoto}: AddFilesInitial) {
    const [dragFiles, setDragFiles] = useState(false);


    let dragStartHandler = (e: any) => {
        e.preventDefault()
        setDragFiles(true)
        if (e.target.className == 'drop-area') {
            e.target.style.backgroundColor = '#E7EBEF'
            e.target.style.boxShadow = '0px 0px 5px 3px rgba(197, 197, 197, 0.45)'
        }
    }
    let dragLeaveHandler = (e: any) => {
        e.preventDefault()
        setDragFiles(false)
        if (e.target.className == 'drop-area') {
            e.target.style = 'none'
        }
    }
    let onDropHandler = (e: any) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        if (type == LOAD_WORKSPACE_BACKGROUND) {
            UploadBackground(files)
        }
        if (type == LOAD_USER_IMG) {
            UploadUserPhoto(files)
        }
        setDragFiles(false)
        if (e.target.className == 'drop-area') {
            e.target.style = 'none'
        }
    }

    let UploadByType = (files: any) => {
        if (type == LOAD_WORKSPACE_BACKGROUND) {
            UploadBackground(files)
        }
        if (type == LOAD_USER_IMG) {
            UploadUserPhoto(files)
        }
    }
    return (
        <>
            {dragFiles ?
                <div className={`drop-area ${type == LOAD_USER_IMG ? 'dnd-load-user-img' : ''}`}
                     onDragStart={(e) => dragStartHandler(e)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={(e) => dragStartHandler(e)}
                     onDrop={(e) => onDropHandler(e)}
                >
                    <div className='drop-area__title'>Release the jpg files to
                        add{type == LOAD_USER_IMG ? ' photo' : ''}
                        {type == LOAD_USER_IMG ? ' photo' : ''}
                        {type == LOAD_WORKSPACE_BACKGROUND ? ' background' : ''}
                    </div>
                    <span> or </span>
                    <input type="file" accept='image/*,.jpg' onChange={(e) => UploadByType(e.target.files)}/>
                </div>
                :
                <div className={`drop-area 
                        ${type == LOAD_USER_IMG ? 'dnd-load-user-img' : ''} 
                        ${type == LOAD_WORKSPACE_BACKGROUND ? ' dnd-load-background' : ''}
                        `}
                     onDragStart={(e) => dragStartHandler(e)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={(e) => dragStartHandler(e)}
                >
                    <div className='drop-area__title'>Drag the jpg files to add
                        {type == LOAD_USER_IMG ? ' photo' : ''}
                        {type == LOAD_WORKSPACE_BACKGROUND ? ' background' : ''}
                    </div>
                    <span> or </span>
                    <label className="input-file">
                        <input type="file" name="file" accept='image/*,.jpg'
                               onChange={(e) => UploadByType(e.target.files)}/>
                        <span>Select file</span>
                    </label>
                </div>
            }


        </>
    )
}

const mapStateToProps = (state: any) => ({
    filesUrl: state.WorkspaceReducer.backgroundImgUrl,
})


export default connect(mapStateToProps, {UploadFiles, DeleteFiles, UploadBackground, UploadUserPhoto})(AddFilesElement);
;