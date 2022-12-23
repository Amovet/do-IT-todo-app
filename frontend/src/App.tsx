import React from 'react';
import Header from './components/Header/Header'
import Workspace from "./pages/Workspace/Workspace";
import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Signup from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Window from "./components/Window/Window";
import All_todo from "./pages/AllTodo/All_todo";
import WorkspaceAll from "./pages/Workspace/Workspace_all";
import {connect} from "react-redux";
import WindowEror from "./components/Window/Eror";
import Upcoming from "./pages/Upcoming/Upcoming";
import Accounts from "./pages/Account/Accounts";
import Eror from "./pages/Eror/Eror"
import WorkspaceFollow from "./pages/Workspace/Workspace_follow";
interface AppProps{
    WindowView:boolean,
    err:boolean
}
function App({WindowView,err}:AppProps) {
  return (
    <div>
        <Header/>
        {err!==null?<WindowEror/>:null}
        {WindowView?<Window/>:null}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/workspace/:id' element={<Workspace/>}/>
            <Route path='/workspace-follow/:token' element={<WorkspaceFollow/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/all_todo' element={<All_todo/>}/>
            <Route path='/workspace/all' element={<WorkspaceAll/>}/>
            <Route path='/upcoming' element={<Upcoming/>}/>
            <Route path='/account' element={<Accounts/>}/>
            <Route path="*" element={<Eror/>}/>
        </Routes>
    </div>
  );
}
const mapStateToProps = (state:any) =>({
    WindowView:state.SettingsReducer.WindowView,
    err:state.SettingsReducer.Err
})
export default connect(mapStateToProps, {})(App);
