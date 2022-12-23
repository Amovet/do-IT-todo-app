import SideToDo from "../models/SideToDo.js";


export const createSideTodo = async (req, res)=>{

    try{

        const doc = new SideToDo({
            title: req.body.title,
            isDone: req.body.isDone,
            todoID: req.body.todoID
        })
        const todo = await doc.save()
        res.json(todo)
    }
    catch(err){
    res.status(500).json({massage:'Error with add side todo\'s'},err)
    }
}



export const removeSideTodo = async (req, res)=>{

    try{
        const todoId = req.params.id;

        SideToDo.findOneAndDelete({
                _id: todoId,
                user: req.userId,
            },
            (err,doc)=>{
            if (err){
                return res.status(500).json({massage:'Error with deleted side todo'},err)
            }
            if(!doc)
                return res.status(404).json({massage:'Todo not found'},err)
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
       res.status(500).json(
           {massage:'Error with view side todo'},err)
    }
}

export const updateSideTodo = async (req, res)=>{

    try{
        const todoId = req.params.id;
        await SideToDo.updateOne({
                _id: todoId,
                user: req.userId,
            },
            {
                title:req.body.title,
                isDone:req.body.isDone,
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
        res.status(500).json({massage:'Error with update side todo'},err)
    }
}

export const getAllSidesToDo = async (req, res)=>{

    try{
        const COMMENTS = await SideToDo.find({ todoID: req.params.todoID })
        res.json(COMMENTS)
    }
    catch(err){
        res.status(500).json({massage:'Error with view side todos'},err)
    }
}