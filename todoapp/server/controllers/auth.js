import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Controller - Register new User */
export const register = async(request, response) => {
    try {
        // Deconstruct user data from request body
        const {
            surName,
            firstName,
            userName,
            password,
            email,
            pic,
            taskList
        } = request.body;

        // Generate salt to encrypt password with
        const salt = await bcrypt.genSalt();
        const pwHash = await bcrypt.hash(password, salt);

        // Map data to a new user object
        const newUser = new User({
            surName,
            firstName,
            userName,
            password: pwHash,
            email,
            pic,
            taskList
        })

        // Save user data to db
        const savedUser = await newUser.save();
        
        // Report success (201), and return user data
        response.status(201).json({
            user: savedUser,
            msg: "New user registered",
        });
    } catch (err) {
        response.status(500).json({
            msg: err.message
        });
    }
}
