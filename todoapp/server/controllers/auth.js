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
        const savedUser = newUser.save();
        
        // Report success, and return user data
        response.status(201).json(savedUser);   // return 201 for "successful creation"
    } catch (error) {
        response.status(500).json({errorMsg: error.message});
    }
}
