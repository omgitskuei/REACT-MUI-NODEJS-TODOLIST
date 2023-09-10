import mongoose from "mongoose";

const TasklistSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "Untitled Tasklist",
            max: 50,
        },
        description: {
            type: String,
            default: "",
            max: 50,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
        tasks: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true,
    }
)

const Tasklist = mongoose.model("Tasklist", TasklistSchema);

export default Tasklist;
