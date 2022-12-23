import ToDo from "../models/ToDo.js";
import Workspace from "../models/Workspace.js";
import UserModel from "../models/User.js";


export const create = async (req, res)=>{

    try{
        const doc = new ToDo({
            title: req.body.title,
            description: req.body.description,
            endTime: req.body.endTime,
            importance: req.body.importance,
            filesUrl: req.body.filesUrl,
            workspacesId:req.body.workspacesId,
            status: req.body.status,
            isDone: req.body.isDone,
            user: req.userId
        })

        const todo = await doc.save()
        res.json(todo)
    }
    catch(err){
    res.status(500).json({massage:'Error with add todos\'s'},err)
    }
}

export const getAllToDo = async (req, res)=>{

    try{
        let CheckOwner = await ToDo.find({ user: req.userId })
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        //get user workspaces id (for search to do by id), if the user who makes the request does not know who the owner to do
        let OwnerWorkspaces = await Workspace.find({ user: req.userId })
        let GuestWorkspaces = await Workspace.find({ Guest: req.userId })
        let userWorkspaces = [...OwnerWorkspaces,...GuestWorkspaces]
        let userWorkspacesId = []
        //get from workspaces objects his id
        userWorkspaces.map(e=> userWorkspacesId.push(e._id))
        let CheckGuest = await ToDo.find({ workspacesId: [...getGuestWorkspaces,...userWorkspacesId] })
        let resultFind = [...CheckOwner,...CheckGuest]
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        res.json(resultFind)
    }
    catch(err){
        res.status(500).json({massage:'Error with view todos\'s'},err)
    }
}

export const getUpcomingToDo = async (req, res)=>{
    const type = req.params.type;
    let sortType
    if(type=='latest'){sortType=1}
    if(type=='oldest'){sortType=-1}
    try{
        let CheckOwner = await ToDo.find({ user: req.userId, endTime : { $exists : true} }).sort({endTime:sortType})
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        //get user workspaces id (for search to do by id), if the user who makes the request does not know who the owner to do
        let OwnerWorkspaces = await Workspace.find({ user: req.userId })
        let GuestWorkspaces = await Workspace.find({ Guest: req.userId })
        let userWorkspaces = [...OwnerWorkspaces,...GuestWorkspaces]
        let userWorkspacesId = []
        //get from workspaces objects his id
        userWorkspaces.map(e=> userWorkspacesId.push(e._id))
        let CheckGuest = await ToDo.find({ workspacesId: [...getGuestWorkspaces,...userWorkspacesId], endTime : { $exists : true} }).sort({endTime:sortType})
        let resultFind = [...CheckOwner,...CheckGuest]
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        res.json(resultFind)
    }
    catch(err){
        res.status(500).json({massage:'Error with view todos\'s'},err)
    }
}


export const getToDo = async (req, res)=>{

    try{
        const todoId = req.params.id;
        //get to do, if workspace and to do owner is user who made request
        let CheckOwner = await ToDo.findById(todoId).find({ user: req.userId })
        //get GuestWorkspaces id (for search to do by id), if user who made request is guest in workspace
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        //get user workspaces id (for search to do by id), if the user who makes the request does not know who the owner to do
        let OwnerWorkspaces = await Workspace.find({ user: req.userId })
        let GuestWorkspaces = await Workspace.find({ Guest: req.userId })
        let userWorkspaces = [...OwnerWorkspaces,...GuestWorkspaces]
        let userWorkspacesId = []
        //get from workspaces objects his id
        userWorkspaces.map(e=> userWorkspacesId.push(e._id))
        let CheckGuest = await ToDo.findById(todoId).find({ workspacesId: [...getGuestWorkspaces,...userWorkspacesId] })
        let resultFind = [...CheckOwner,...CheckGuest]
        //delete similar obj
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        res.json(resultFind)
    }
    catch(err){
        res.status(500).json({massage:'Error with view todos'},err)
    }
}

export const remove = async (req, res)=>{

    try{
        const todoId = req.params.id;

        //rework, because if user is the to do owner he makes unnecessary requests
        let CheckOwner = await ToDo.findById(todoId).find({ user: req.userId })
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        let CheckGuest = await ToDo.findById(todoId).find({ workspacesId: getGuestWorkspaces })
        let resultFind = [...CheckOwner,...CheckGuest]
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        if(resultFind.length>0){
            ToDo.findOneAndDelete({
                    _id: todoId,
                },
                (err,doc)=>{
                    if (err){
                        return res.status(500).json({massage:'Error with deleted todo'},err)
                    }
                    if(!doc)
                        return res.status(404).json({massage:'Todo not found'},err)
                }
            )
        }

        res.json({
            success:true
        })
    }
    catch(err){
       res.status(500).json(
           {massage:'Error with view todos'},err)
    }
}

export const update = async (req, res)=>{

    try{
        const todoId = req.params.id;
        //rework, because if user is the to do owner he makes unnecessary requests
        let CheckOwner = await ToDo.findById(todoId).find({ user: req.userId })
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        //get user workspaces id (for search to do by id), if the user who makes the request does not know who the owner to do
        let OwnerWorkspaces = await Workspace.find({ user: req.userId })
        let GuestWorkspaces = await Workspace.find({ Guest: req.userId })
        let userWorkspaces = [...OwnerWorkspaces,...GuestWorkspaces]
        let userWorkspacesId = []
        //get from workspaces objects his id
        userWorkspaces.map(e=> userWorkspacesId.push(e._id))
        let CheckGuest = await ToDo.findById(todoId).find({ workspacesId: [...getGuestWorkspaces,...userWorkspacesId] })
        let resultFind = [...CheckOwner,...CheckGuest]
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        if(resultFind.length>0){
        await ToDo.updateOne({
                _id: todoId,
            },
            {
                title:req.body.title,
                description: req.body.description,
                endTime: req.body.endTime,
                importance: req.body.importance,
                filesUrl: req.body.filesUrl,
                status:req.body.status,
                isDone:req.body.isDone,
            }
        )
        }
        res.json({
            success:true
        })
    }
    catch(err){
        res.status(500).json({massage:'Error with update workspaces'},err)
    }
}

export const searchToDo = async (req, res)=>{

    try{
        const value = req.params.value;
        let CheckOwner = await ToDo.find({ user: req.userId })
        let getGuestWorkspaces = await UserModel.find({ _id: req.userId })
        getGuestWorkspaces = getGuestWorkspaces[0].guestWorkspaces
        //get user workspaces id (for search to do by id), if the user who makes the request does not know who the owner to do
        let OwnerWorkspaces = await Workspace.find({ user: req.userId })
        let GuestWorkspaces = await Workspace.find({ Guest: req.userId })
        let userWorkspaces = [...OwnerWorkspaces,...GuestWorkspaces]
        let userWorkspacesId = []
        //get from workspaces objects his id
        userWorkspaces.map(e=> userWorkspacesId.push(e._id))
        let CheckGuest = await ToDo.find({ workspacesId: [...getGuestWorkspaces,...userWorkspacesId] })
        let resultFind = [...CheckOwner,...CheckGuest]
        resultFind = Object.values(resultFind.reduce((acc, n) => ((!acc[n.id] || n.checked) && (acc[n.id] = n), acc), {}))
        let results=resultFind.filter(todo => {
                return todo.title.toLowerCase().includes(value.toLowerCase())
            })
        res.json(results)
    }
    catch(err){
        res.status(500).json({massage:'Error with search workspaces'},err)
    }
}