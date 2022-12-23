import mongoose from "mongoose";

const SideToDoSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        isDone: {
            type: Boolean,
            required: true
        },
        todoID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ToDo',
            required:true
        },
    },
    {timestamps:true}
)

export default mongoose.model('SideToDo',SideToDoSchema)