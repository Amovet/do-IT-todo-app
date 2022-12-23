import React, {useState} from "react";
import {connect} from "react-redux";
import {
    UploadFiles,
    DeleteFiles
} from "../../../redux/Todo-reducer";


interface AddFilesInitial {
    filesUrl: Array<string> | undefined,
    UploadFiles: (file: any) => void,
    DeleteFiles: (value: string) => void
}

function AddFilesElement({filesUrl, DeleteFiles, UploadFiles}: AddFilesInitial) {
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
        UploadFiles(files)
        setDragFiles(false)
        if (e.target.className == 'drop-area') {
            e.target.style = 'none'
        }
    }

    let FileItems = () => {
        if (filesUrl !== undefined) {
            return (
                <div>
                    {filesUrl.map(e =>
                        <div key={e.substring(0, 22)} className='files-item'>
                            <a href={e}
                               download={e.substring(22, e.length)}>{e.substring(22, e.length).slice(0, 43)}{e.length - 22 > 43 ? '...' : null}</a>
                            <div onClick={() => DeleteFiles(e)}>✕</div>
                        </div>
                    )}
                </div>
            )
        }
    }

    return (
        <>
            {filesUrl == undefined || filesUrl.length < 1 ? null : FileItems()}
            {dragFiles ?
                <div className='drop-area'
                     onDragStart={(e) => dragStartHandler(e)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={(e) => dragStartHandler(e)}
                     onDrop={(e) => onDropHandler(e)}
                >Release the files to add to TODO

                </div>

                :
                <div className='drop-area'
                     onDragStart={(e) => dragStartHandler(e)}
                     onDragLeave={(e) => dragLeaveHandler(e)}
                     onDragOver={(e) => dragStartHandler(e)}
                >
                    Drag the files to add to TODO
                </div>
            }

        </>
    )
}

const mapStateToProps = (state: any) => ({
    filesUrl: state.TodoReducer.filesUrl,
})


export default connect(mapStateToProps, {UploadFiles, DeleteFiles})(AddFilesElement);
;