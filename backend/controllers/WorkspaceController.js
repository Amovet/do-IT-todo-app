import Workspace from "../models/Workspace.js";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import ToDo from "../models/ToDo.js";


export const createWorkspace = async (req, res)=>{

    try{
        const doc = new Workspace({
            title: req.body.title,
            description: req.body.description,
            QueueeTodo: req.body.QueueeTodo,
            DevelopmentTodo: req.body.DevelopmentTodo,
            DoneTodo: req.body.DoneTodo,
            backgroundImgUrl: req.body.backgroundImgUrl,
            endTime: req.body.endTime,
            theme: req.body.theme,
            user: req.userId,
        })

        const workspace = await doc.save()
        res.json(workspace)
    }
    catch(err){
    res.status(500).json({massage:'Error with add workspace'},err)
    }
}
//
export const getAllWorkspace = async (req, res)=>{

    try{
        let CheckOwner = await Workspace.find({ user: req.userId })
        let CheckGuest = await Workspace.find({ Guest: req.userId })
        let resultFind = [...CheckOwner,...CheckGuest]
        res.json(resultFind)
    }
    catch(err){
        res.status(500).json({massage:'Error with view workspace'},err)
    }
}

export const getWorkspace = async (req, res)=>{

    try{
        const workspaceId = req.params.id;
        let CheckOwner = await Workspace.findById(workspaceId).find({ user: req.userId })
        let CheckGuest = await Workspace.findById(workspaceId).find({ Guest: req.userId })
        let resultFind = [...CheckOwner,...CheckGuest]
        res.json(resultFind)
    }
    catch(err){
        res.status(500).json({massage:'Error with view workspace'},err)
    }
}

export const removeWorkspace = async (req, res)=>{

    try{
        const workspaceId = req.params.id;

        Workspace.findOneAndDelete({
                _id: workspaceId ,
                user: req.userId,
            },
            (err,doc)=>{
            if (err){
                return res.status(500).json({massage:'Error with deleted workspace'},err)
            }
            if(!doc)
                return res.status(404).json({massage:'Workspace not found'},err)
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
        console.log(err)
       res.status(500).json(
           {massage:'Error with view workspace'},err)
    }
}

export const updateWorkspace = async (req, res)=>{

    try{
        const workspaceId = req.params.id;
        let CheckOwner = await Workspace.findById(workspaceId).find({ user: req.userId })
        let CheckGuest = await Workspace.findById(workspaceId).find({ Guest: req.userId })
        let resultFind = [...CheckOwner,...CheckGuest]
        if(resultFind.length>0){
        await Workspace.updateOne({
                _id: workspaceId,

            },
            {
                title: req.body.title,
                description: req.body.description,
                QueueeTodo: req.body.QueueeTodo,
                DevelopmentTodo: req.body.DevelopmentTodo,
                DoneTodo: req.body.DoneTodo,
                backgroundImgUrl: req.body.backgroundImgUrl,
                endTime: req.body.endTime,
                theme: req.body.theme,
                Guest: req.body.guest,
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

export const removeAllWorkspaceTodos = async (req, res)=>{

    try{
        const workspaceId = req.params.id;
        ToDo.deleteMany({workspacesId : workspaceId},
            (err,doc)=>{
                if (err){
                    return res.status(500).json({massage:'Error with deleted workspace'},err)
                }
                if(!doc)
                    return res.status(404).json({massage:'Workspace not found'},err)
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(
            {massage:'Error with view workspace'},err)
    }
}

export const addRemoteWorkspace = async (req, res)=>{
    try{
        const workspaceId = req.params.id;
        const workspaceFind = await Workspace.findById(workspaceId).find({ user: req.userId })

        if(!workspaceFind){
            return  res.status(403).json({massage:'Invalid with auth user or workspace id'})
        }
        const shareKey = req.body.shareKey;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(shareKey, salt)

        //create shareKey
        await Workspace.updateOne({
                _id: workspaceId,
                user: req.userId,
            },{
                shareKey: hash,
            }
        )
        res.json({
            success:true,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Set remote key failed'
        })
    }
}

export const addWorkspaceLink = async (req, res)=>{
    try{
        const workspaceId = req.params.id;

        const workspaceFind = await Workspace.findById(workspaceId).find({ user: req.userId })
        if(workspaceFind.length==0||!workspaceFind){
            return  res.status(403).json({massage:'Invalid with auth user or workspace id'})
        }

        const token = jwt.sign({
                _id: workspaceId,
            }, `${process.env.SecretOrPrivateKey}`,
            {
                expiresIn: '15m'
            }
        )

        res.json({
            success:true,
            token,
        })
    }
    catch(err){
        res.status(500).json({
            massage:'Set remote key failed'
        })
    }
}

export const getRemoteWorkspace = async (req, res)=>{
    try{
        const shareKey = req.body.shareKey;
        const token = req.params.token
        const decoded = jwt.verify(token, `${process.env.SecretOrPrivateKey}`)
        const workspaceId = decoded._id
        const workspace = await Workspace.findOne({_id:workspaceId});
        if(!workspace){
            return  res.status(403).json({massage:'Invalid id or key'})
        }
        const isValidKey = await bcrypt.compare(shareKey, workspace._doc.shareKey)
        if(!isValidKey){
            return  res.status(403).json({massage:'Invalid id or key'})
        }
        const guestWorkspacesUser = await UserModel.findById(req.userId)
        if(workspace.user._id.valueOf()==guestWorkspacesUser._id.valueOf()){
            return  res.json({massage:'You are owner this workspace',own:true})
        }
        if(!guestWorkspacesUser.guestWorkspaces.includes(workspaceId)){
            await UserModel.updateOne({_id:req.userId},
                {
                    guestWorkspaces: [...guestWorkspacesUser.guestWorkspaces,workspaceId],
                }
            )
        }


        if(!workspace.Guest.includes(req.userId)){
            await Workspace.updateOne({_id:workspaceId},
                {
                    Guest: [...workspace.Guest,req.userId],
                }
            )
        }

        res.json({
            success:true,
            workspace:decoded._id
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Get remote workspace fail'
        })
    }
}