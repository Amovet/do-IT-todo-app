import React, {useState} from "react";
import {connect} from "react-redux";
import WorkspaceItem from "../../components/Workspace/Workspace_item";


function WorkspaceAll({workspaces}: any) {
    const [maxNumb, setMaxNumb] = useState(10);
    let WorkspacesElements = workspaces.slice(0, maxNumb).map((e: any) =>
        <WorkspaceItem key={e._id} title={e.title} id={e._id} description={e.description}/>
    )

    let editMaxNub = () => {
        if (maxNumb + 10 < workspaces.length) {
            setMaxNumb(maxNumb + 10)
        } else {
            setMaxNumb(workspaces.length)
        }
    }

    return (
        <section className='workspace'>
            <div className='workspace__container'>
                <div className='workspace__title-container'>
                    <div className='workspace__title'>
                        <div>Your workspaces</div>
                    </div>
                </div>
                {workspaces.length < 1 ?
                    <div className="workspace__info">So far, not a single workspace has been added yet ;(</div> : null}
                {WorkspacesElements}
                {workspaces.length > maxNumb ?
                    <div onClick={() => editMaxNub()} className='workspace__view-all'>Load more</div> : null}
            </div>
        </section>
    )
}

const mapStateToProps = (state: any) => ({
    workspaces: state.WorkspaceReducer.Workspaces,
})


export default connect(mapStateToProps, null)(WorkspaceAll);