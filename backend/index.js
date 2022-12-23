import express from 'express';
import mongoose from "mongoose";
import checkAuth from "./functions/checkAuth.js";
import multer from 'multer'
import cors from 'cors'
import {
    create, getAllToDo, getToDo, remove, update,
    registerValidation,userUpdateValidation, loginValidation, toDoCreateValidation, workspaceValidation, commentValidation,
    createComment, getComment, getAllComment, removeComment, updateComment,
    createWorkspace, getAllWorkspace, getWorkspace, removeWorkspace, updateWorkspace,
    uploadFiles, checkValidationEror, login, register, auth, getAllToDoComments,getUserInfo,updateUserInfo
} from "./file-bundle.js";
import {getUpcomingToDo, searchToDo} from "./controllers/ToDoController.js";
import {workspaceUpdateValidation} from "./validations/Workspace.js";
import {sideToDoCreateValidation, sideToDoUpdateValidation, toDoUpdateValidation} from "./validations/ToDo.js";
import {createSideTodo, getAllSidesToDo, removeSideTodo, updateSideTodo} from "./controllers/SideToDoController.js";
import {
    addRemoteWorkspace,
    addWorkspaceLink,
    getRemoteWorkspace,
    removeAllWorkspaceTodos
} from "./controllers/WorkspaceController.js";


const MongoDB_URL = `input your own mongoDB url`

mongoose.connect(MongoDB_URL)
    .then(()=> console.log('MongoDB connected'))
    .catch((err)=>console.log('Connected to MongoDB is failed', err))
const app = express();

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads')
    },
    filename:(_,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

const maxSize = 10*1024*1024 //10 mb

const upload = multer({
    storage:storage,
    limits: { fileSize: maxSize }
});
app.use(cors())
app.use(express.json())

//routes for login and auth

app.get('/auth/me', checkAuth, auth)

app.get('/user_info/:id', getUserInfo)

app.post('/auth/login', loginValidation,checkValidationEror,login)

app.post('/auth/register', registerValidation,checkValidationEror, register)

app.patch('/user_info/',checkAuth, userUpdateValidation,checkValidationEror, updateUserInfo)

//routes for todo

app.post('/todo', checkAuth, toDoCreateValidation,checkValidationEror, create)

app.get('/todo',checkAuth, getAllToDo)

app.get('/todo/upcoming/:type',checkAuth, getUpcomingToDo)

app.get('/todo/:id',checkAuth, getToDo)

app.delete('/todo/:id',checkAuth, remove)

app.patch('/todo/:id',checkAuth, toDoUpdateValidation,checkValidationEror, update)

//routes for side todo
app.post('/side_todo', checkAuth, sideToDoCreateValidation,checkValidationEror, createSideTodo)

app.delete('/side_todo/:id',checkAuth, removeSideTodo)

app.patch('/side_todo/:id',checkAuth, sideToDoUpdateValidation,checkValidationEror, updateSideTodo)

app.get('/side_todo/:todoID',checkAuth, getAllSidesToDo)

//routes for workspace
app.post('/workspace', checkAuth, workspaceValidation,checkValidationEror, createWorkspace)

app.get('/workspace',checkAuth, getAllWorkspace)

app.get('/workspace/:id',checkAuth, getWorkspace)

app.delete('/workspace/:id',checkAuth, removeWorkspace)

app.delete('/workspace-todos/:id',checkAuth, removeAllWorkspaceTodos)

app.patch('/workspace/:id',checkAuth, workspaceUpdateValidation,checkValidationEror, updateWorkspace)

app.patch('/workspace-set-remote/:id',checkAuth, addRemoteWorkspace)

app.post('/workspace-remote/:token',checkAuth ,getRemoteWorkspace)

app.get('/workspace-link/:id',checkAuth ,addWorkspaceLink)

//routes for comment
app.post('/comment', checkAuth, commentValidation,checkValidationEror, createComment)

app.get('/comment',checkAuth, getAllComment)

app.get('/comment/:id',checkAuth, getComment)

app.get('/search/:value',checkAuth, searchToDo)

app.delete('/comment/:id',checkAuth, removeComment)

app.patch('/comment/:id',checkAuth, commentValidation,checkValidationEror, updateComment)

app.get('/all_todo_comment/:todoID',checkAuth, getAllToDoComments)

//routes for upload
app.post('/upload',checkAuth, upload.array('files',5), uploadFiles)

app.use('/uploads', express.static('uploads'))

app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log('server ok')
})
