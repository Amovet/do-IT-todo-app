import React, {useState, useEffect, useRef} from 'react';
import searchIco from '../../../assets/img/search.svg'
import {connect} from "react-redux";
import {SearchTodo} from "../../../redux/Settings-reducer";
import OutsideMenuAlerter from "../../../hoc/Detect-click-menu";
import {OpenTodo} from "../../../redux/Todo-reducer";

interface SearchElementProps {
    SearchTodo: (value: string) => void,
    result: Array<object>,
    OpenTodo: (id: number) => void,
}

function SearchElement({SearchTodo, result, OpenTodo}: SearchElementProps) {
    const [view, setView] = useState(true);
    const SearchRef = useRef(null)
    const SearchElemRef = useRef(null)

    let SearchResult = result.map((e: any) =>
        <div className='search-popup-menu__elem' key={e._id} onClick={() => {
            setView(false);
            OpenTodo(e._id)
        }}>
            {e.title}
        </div>
    )
    let Search = (value: string) => {
        SearchTodo(value);
        if (value.length > 2) {
            setView(true)
        }
    }


    return (
        <>
            <img src={searchIco} alt="" className='search-ico'/>
            <input type="text" onChange={e => Search(e.target.value)}
                   onClick={() => result.length > 0 ? setView(true) : null} ref={SearchElemRef}
                   placeholder={'Enter todo name'} className='search-input'/>

            {result.length > 0 && view == true ?
                <OutsideMenuAlerter menuRef={SearchRef}
                                    setToggle={setView}
                                    toggle={view}
                                    menuElemRef={SearchElemRef}
                >
                    <div className='header__drop-down-menu' ref={SearchRef}>
                        <>{SearchResult}</>
                    </div>
                </OutsideMenuAlerter>
                :
                null
            }

        </>
    );
}

const mapStateToProps = (state: any) => ({
    result: state.SettingsReducer.SearchResult,
    loading: state.SettingsReducer.LoadingSearch
})

export default connect(mapStateToProps, {SearchTodo, OpenTodo})(SearchElement);
