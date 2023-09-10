import User from "../models/User.js";
import Tasklist from "../models/Tasklist.js";

export const getUser = async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await User.findById(userId);
        response.status(200).json({
            user: user,
            msg: "Retrieved user",
        });
    } catch (error) {
        response.status(404).json({msg: error.msg});
    }
}

export const getUserTasklists = async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await User.findById(userId);
        const tasklists = await Promise.all(
            user.taskLists.map((id) => Tasklist.findById(id))
        );
        const formattedTasklists = tasklists.map(
            ({
                _id,
                title,
                description,
                lastUpdated,
                tasks
            }) => {
                return {
                    _id,
                    title,
                    description,
                    lastUpdated,
                    tasks
                };
            }
        );
        response.status(200).json({ 
            user: user,
            tasklists: formattedTasklists,
            msg: "Retrieved tasklists"
        })
    } catch (error) {
        response.status(404).json({ 
            msg: error.msg
        })
    }
}
