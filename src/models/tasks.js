import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    date: {
        type:String,
        require:true,
    },
    deadline: {
        type:String,
        require:true,
    },
    link: {
        type:String,
        require:true,
    },
    note: {
        type:String,
       default:'',
    },
    teacher_id: {
        type:String,
        require:true,
    },
    status: {
        type:Number,
        default:1,
    },
})

let taskModel;
if(mongoose.models.Task) {
    taskModel = mongoose.model('Task')
} else {
    taskModel = mongoose.model('Task', taskSchema)
}

export default taskModel