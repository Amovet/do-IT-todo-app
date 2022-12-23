import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddErr, SetWindowsViewFalse} from "../../redux/Settings-reducer";
import {CreateWorkspace} from "../../redux/Workspaces-reducer";


interface AddWorkspaceElementProps{
    SetWindowsViewFalse:()=>void,
    AddErr:(text:string)=>void,
    CreateWorkspace:(name:string,description:string)=>void
}

function AddWorkspaceElement({SetWindowsViewFalse,AddErr,CreateWorkspace}:AddWorkspaceElementProps){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [charLeft, setCharLeft] = useState(600);

    useEffect(() => {
        setCharLeft(600-description.length)
    }, [description]);


    let validate = () => {
        if(name.length>5&&description.length>10){
            CreateWorkspace(name,description)
        }else{
            if(name.length<5){AddErr("Name must contain more than 5 characters")}
            if(description.length<10){AddErr("Description must contain more than 10 characters")}
        }
    }

    return(
        <div className='create-window'>
            <div className='create-window__header header-block'>
                <div className='header-block__title medium-title'>
                    Create workspace
                </div>
                <div className="header-block__exit" onClick={()=>SetWindowsViewFalse()}>
                    <div className='exit-window'/>
                </div>
            </div>
            <div className='create-window__main-block'>
                <div className='create-window__elem'>
                    <div className='create-window__title small-title'>
                        Enter workspace name:
                    </div>
                    <input type="text" className='workspace__title' maxLength={100} onChange={e=>setName(e.target.value)}/>
                    <div className='create-window__help sub'>Min number of characters: 5</div>
                </div>
                <div className='create-window__elem'>
                    <div className='create-window__title small-title'>
                        Enter workspace description:
                    </div>
                    <textarea className='description__text' maxLength={600} onChange={e=>setDescription(e.target.value)}/>
                    <div className='create-window__help sub'>Min number of characters: 10 {charLeft<590?<>, character left: {charLeft}</>:null} </div>
                </div>
                <div className='create-window__button' onClick={()=>validate()}>Create workspace</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) =>({

})


export default connect(mapStateToProps, {SetWindowsViewFalse,AddErr,CreateWorkspace})(AddWorkspaceElement);