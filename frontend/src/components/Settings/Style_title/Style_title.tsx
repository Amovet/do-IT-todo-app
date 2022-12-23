import React, {useState} from "react";
import {connect} from "react-redux";
import {THEME} from "../../../Constants/Constants";
import {AddTheme} from "../../../redux/Workspaces-reducer";
import dropDownIco from '../../../assets/img/drop.svg'
import UpIco from '../../../assets/img/up.svg'


interface ThemeInitial{
    AddTheme:(theme:string)=>void
}

function StyleTitleElement({AddTheme}:ThemeInitial){
    const [viewTextStyleChange, setViewTextStyleChange] = useState(false);


    return(
        <>
            <div className='settings-window__title small-title' onClick={()=>setViewTextStyleChange(!viewTextStyleChange)}>
                <div>Select text style</div>
                <img src={viewTextStyleChange?UpIco:dropDownIco} alt=""/>
            </div>
            {viewTextStyleChange?
                <div className='settings-window__text-style'>
                    {THEME.map((e:string)=>
                        <div className={`buttons  ${e=='Dark'?'dark-elem':null}`} key={e} onClick={()=>AddTheme(e)}>
                            For {e} theme
                        </div>
                    )}
                </div>
                :
                null
            }
        </>
    )
}



export default connect(null, {AddTheme})(StyleTitleElement);