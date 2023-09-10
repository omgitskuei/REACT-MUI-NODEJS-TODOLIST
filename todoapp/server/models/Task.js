import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        completed: {
            type: Boolean ,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            default: "",
        },
        priority: {
            type: String,
            default: "Low",
        },
        content: {
            type: String,
            default: "",
            max: 50,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model("Task", TaskSchema);

export default Task;
