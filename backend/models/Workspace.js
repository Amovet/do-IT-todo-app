import mongoose from "mongoose";
import User from "./User.js";

const WorkspaceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required: true,
    },

    QueueeTodo:{
        type:Array,
        required:true,
        default:[]
    },
    DevelopmentTodo:{
        type:Array,
        required:true,
        default:[]
    },
    DoneTodo:{
        type:Array,
        required:true,
        default:[]
    },
    Guest:{
        type:Array,
        default:[]
    },
    endTime:{
         type:Date,
    },
    backgroundImgUrl: String,
    shareKey: String,
    theme: {
        type:String,
        default:'Light'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
    },
    {timestamps:true}
)

export default mongoose.model('Workspace',WorkspaceSchema)