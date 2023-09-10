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


/* Controller - Login registered User */
export const login = async(request, response) => {
    try {
        // Deconstruct user data from request body
        const {
            userName,
            password,
        } = request.body;

        // Query one User with matching userName
        const queriedUser = await User.findOne({
            userName: userName,
        })

        // If no User matched the userName, return not-found
        if (!queriedUser) {
            return response.status(400).json({
                msg: "Credentials not found, please double-check and retry later.",
            })
        }
        
        // If User passwords don't match, return invalid
        const isMatch = await bcrypt.compare(password, queriedUser.password);
        if (!isMatch) {
            return response.status(400).json({
                msg: "Invalid credentials, please double-check and retry later.",
            })
        }

        // Create a token to be sent back to the user
        const token = jwt.sign({ 
            id: queriedUser._id 
        },
        process.env.JWT_SECRET);
        delete queriedUser.password;    // remove password from queried result
        
        // Report success, and return token
        response.status(200).json({
            token: token,
            user: queriedUser,
            msg: "User logged in",
        });
    } catch (error) {
        response.status(500).json({
            msg: error.message
        });
    }
}