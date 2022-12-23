import mongoose from "mongoose";
import User from "./User.js";

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    filesUrl: String,
    todoID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDo',
      required:true,
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
    },
    {timestamps:true}
)

export default mongoose.model('comment',CommentSchema)