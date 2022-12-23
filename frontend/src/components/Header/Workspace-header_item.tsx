import React from "react";
import {useNavigate} from "react-router-dom";


interface WorkspaceHeaderItemProps {
    id: string,
    title: string,
}

function WorkspaceHeaderItem({id, title}: WorkspaceHeaderItemProps) {
    const navigate = useNavigate();
    return (
        <div className='header__drop-down-menu_elem' onClick={() => navigate(`/workspace/${id}`)}>
            {title}
        </div>
    )
}

export default WorkspaceHeaderItem;