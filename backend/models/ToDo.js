import mongoose from "mongoose";
import User from "./User.js";

const ToDoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    endTime:{
         type:Date,
    },
    importance:{
        type:String,
    },
    filesUrl: Array,
    status: {
      type:String,
      required:true
    },
    workspacesId:{
        type:String,
        required:true
    },
    isDone: {
      type:Boolean,
      required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
    },
    {timestamps:true}
)

export default mongoose.model('ToDo',ToDoSchema)