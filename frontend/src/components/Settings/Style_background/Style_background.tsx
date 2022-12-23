import React, {useState} from "react";
import {connect} from "react-redux";
import {SetWindowsViewFalse} from "../../../redux/Settings-reducer";
import {BACKGROUNDS, LOAD_WORKSPACE_BACKGROUND, THEME} from "../../../Constants/Constants";
import {AddTheme, SelectBackground, SetConfirm, UploadBackground} from "../../../redux/Workspaces-reducer";
import dropDownIco from '../../../assets/img/drop.svg'
import UpIco from '../../../assets/img/up.svg'
import AddFilesElement from "../../LoadFile/Add_files";


interface TitleInitial {
    SelectBackground: (e: string) => void,
    AddTheme: (e: string) => void
}

function StyleBackgroundElement({SelectBackground, AddTheme}: TitleInitial) {

    const [viewBgChange, setViewBgChange] = useState(false);

    let selectBackgroundsSettings = (e: string) => {
        if (e == '') {
            SelectBackground(e)
            AddTheme(THEME[1])
        } else {
            SelectBackground(e)
            if (BACKGROUNDS.indexOf(e) < 4) {
                AddTheme(THEME[0])
            } else {
                AddTheme(THEME[1])
            }
        }
    }

    return (
        <>
            <div className='settings-window__title small-title' onClick={() => setViewBgChange(!viewBgChange)}>
                <div>Select background for workspace</div>
                <img src={viewBgChange ? UpIco : dropDownIco} alt=""/>
            </div>
            <div className='settings-window__background'>
                {viewBgChange ?
                    <>
                        <div className='settings-window__style-type'>
                            <div className='settings-window__style-img'
                                 onClick={() => selectBackgroundsSettings('')}>Default
                            </div>
                            {BACKGROUNDS.slice(0, 2).map((e: string) => <img key={e} src={e} alt=""
                                                                             className='settings-window__style-img'
                                                                             onClick={() => selectBackgroundsSettings(e)}/>)}
                        </div>
                        <div className='settings-window__style-type'>
                            {BACKGROUNDS.slice(2, 5).map((e: string) => <img src={e} key={e} alt=""
                                                                             className='settings-window__style-img'
                                                                             onClick={() => selectBackgroundsSettings(e)}/>)}
                        </div>
                        <div className='settings-window__or'>or</div>
                        <AddFilesElement type={LOAD_WORKSPACE_BACKGROUND}/>
                    </>
                    :
                    null
                }
            </div>
        </>
    )
}


export default connect(null, {
    SetWindowsViewFalse,
    UploadBackground,
    SelectBackground,
    AddTheme,
    SetConfirm
})(StyleBackgroundElement);