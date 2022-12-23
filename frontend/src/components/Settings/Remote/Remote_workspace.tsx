import React, {useState} from "react";
import {connect} from "react-redux";
import {GetLink, AddErr, DeleteSecretWord} from "../../../redux/Settings-reducer";
import UpIco from "../../../assets/img/up.svg";
import CopyIco from "../../../assets/img/Copy.svg";
import dropDownIco from "../../../assets/img/drop.svg";
import {SetSecretWord} from "../../../redux/Workspaces-reducer";


interface WorkspaceInitial {
    shared: boolean,
    SetSecretWord: (word: string) => void,
    GetLink: () => void,
    DeleteSecretWord: () => void,
    link: string,
    AddErr: (msg: string) => void
}

function RemoteElement({shared, SetSecretWord, GetLink, DeleteSecretWord, link, AddErr}: WorkspaceInitial) {
    const [viewRemote, setViewRemote] = useState(false);
    const [word, setWord] = useState('');

    let copyLink = () => {
        navigator.clipboard.writeText(link)
        AddErr("Link copied")
    }
    return (
        <div className='settings-window__remote'>
            <div className='settings-window__title small-title' onClick={() => setViewRemote(!viewRemote)}>
                <div>Remote settings</div>
                <img src={viewRemote ? UpIco : dropDownIco} alt=""/>
            </div>
            {viewRemote ?
                <>
                    {shared ?
                        <div className='settings-window__remote-get-link'>
                            <div className='settings-window__remote-get-link-container'>
                                {link == ''?
                                    <div className='buttons bg-gray-light' onClick={() => GetLink()}>
                                        Get the invitation link
                                    </div>
                                :null}

                                {link !== '' ?
                                    <>
                                        <div className='settings-window__remote-min-title'>The link is valid for 15
                                            minutes:
                                        </div>
                                        <div className='settings-window__remote-link' onClick={() => copyLink()}>
                                            <div>{link}</div>
                                            ...
                                            <img src={CopyIco} alt=""/>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                <div className='settings-window__confirm-delete'
                                     onClick={() => DeleteSecretWord()}>Delete secret word
                                </div>
                            </div>
                        </div>
                        :
                        <div className='settings-window__remote-create'>
                            <div className='settings-window__remote-title'>Create a secret word for sharing workspace
                                with other users
                            </div>
                            <div className='settings-window__remote-create-container'>
                                <div className='settings-window__remote-create-info sub'> Minimum number of characters
                                    5
                                </div>
                                <input type="text" name='name' className='remote-input'
                                       onChange={(e) => setWord(e.target.value)}/>
                                <div className='buttons bg-gray-light' onClick={() => SetSecretWord(word)}>Set secret
                                    word
                                </div>
                            </div>
                        </div>
                    }
                </>
                :
                null
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    photo: state.WorkspaceReducer.Owner.avatarUrl,
    fullName: state.WorkspaceReducer.Owner.fullName,
    shared: state.WorkspaceReducer.shareKey,
    link: state.SettingsReducer.ShareLink
})


export default connect(mapStateToProps, {SetSecretWord, GetLink, DeleteSecretWord, AddErr})(RemoteElement);