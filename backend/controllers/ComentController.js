import comment from "../models/Comment.js";


export const createComment = async (req, res)=>{

    try{
        const doc = new comment({
            text: req.body.text,
            filesUrl: req.body.filesUrl,
            todoID: req.body.todoID,
            parentID: req.body.parentID,
            user: req.userId
        })

        const comments = await doc.save()
        res.json(comments)
    }
    catch(err){
    res.status(500).json({massage:'Error with add comment'},err)
    }
}

export const getAllComment = async (req, res)=>{

    try{
        const COMMENTS = await comment.find({ user: req.userId })
        res.json(COMMENTS)
    }
    catch(err){
        res.status(500).json({massage:'Error with view comment'},err)
    }
}

export const getComment = async (req, res)=>{

    try{
        const commentId = req.params.id;
        const COMMENTS = await comment.findById(commentId).find({ user: req.userId })
        res.json(COMMENTS)
    }
    catch(err){
        res.status(500).json({massage:'Error with view comment'},err)
    }
}

export const removeComment = async (req, res)=>{

    try{
        const commentId = req.params.id;

        comment.findOneAndDelete({
                _id: commentId
            },
            (err,doc)=>{
            if (err){
                return res.status(500).json({massage:'Error with deleted comment'},err)
            }
            if(!doc)
                return res.status(404).json({massage:'Comment not found'},err)
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
       res.status(500).json(
           {massage:'Error with remove comment'},err)
    }
}

export const updateComment = async (req, res)=>{

    try{
        const commentId = req.params.id;
        await comment.updateOne({
                _id: commentId,
                user: req.userId,
            },
            {
                text: req.body.text,
                filesUrl: req.body.filesUrl,
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
        res.status(500).json({massage:'Error with update workspaces'},err)
    }
}

export const getAllToDoComments = async (req, res)=>{

    try{
        let h = req.params
        const COMMENTS = await comment.find({ todoID: req.params.todoID })
        res.json(COMMENTS)
    }
    catch(err){
        res.status(500).json({massage:'Error with view comment'},err)
    }
}
