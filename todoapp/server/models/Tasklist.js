import mongoose from "mongoose";

const TasklistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
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
            default: [],    // stores array of ids
        }
    },
    {
        timestamps: true,
    }
)

const Tasklist = mongoose.model("Tasklist", TasklistSchema);

export default Tasklist;
