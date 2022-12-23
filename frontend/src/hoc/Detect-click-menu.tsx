import React, { useEffect } from "react";

function useOutsideMenu(menuRef:any,menuElemRef:any,setToggle:any,toggle:any) {

    useEffect(() => {
        let handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)
                &&!menuElemRef.current.contains(event.target)) {
                setToggle(!toggle)
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);
}


function OutsideMenuAlerter({children,menuRef,menuElemRef,setToggle,toggle}:any) {
    useOutsideMenu(menuRef,menuElemRef,setToggle,toggle);
    return <>{children}</>;
}


export default OutsideMenuAlerter