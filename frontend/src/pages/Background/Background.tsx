import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import back from "../../assets/img/ANIM.gif";


const Background = () => {
    const [backgroundToggle, setBackgroundToggle] = useState(false)
    const location = useLocation();

    useEffect(() => {
        const isSelectedRoute = (location.pathname == '/login' || location.pathname == '/signup')
        if (isSelectedRoute) {
            setBackgroundToggle(true)
        } else {
            setBackgroundToggle(false)
        }

    }, [location.pathname])

    return (
        < >
            {backgroundToggle ?
                <div className='background'><img src={back} alt=""/></div>
                :
                <></>
            }
        </>
    );
}


export default Background;