import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        surName: {
            type: String,
            required: true,
            min: 1,
            max: 50,
        },
        firstName: {
            type: String,
            required: true,
            min: 1,
            max: 50,
        },
        userName: {
            type: String,
            required: true,
            min: 1,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50,
        },
        pic: {
            type: String,
            default: "",
        },
        taskLists: {
            type: Array,
            default: [],    // stores array of ids
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema);

export default User;
