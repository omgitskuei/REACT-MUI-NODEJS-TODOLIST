import User from "../models/User.js";
import Tasklist from "../models/Tasklist.js";

export const getUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        response.status(200).json({
            user: user,
            msg: "Retrieved user",});
    } catch (error) {
        response.status(404).json({msg: error.msg});
    }
}

export const getUserTasklists = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
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
            tasklists: formattedTasklists,
            msg: "Retrieved tasklists"
        })
    } catch (error) {
        response.status(404).json({ 
            msg: error.msg
        })
    }
}

/* Update (add/remove) tasklists */
export const UpdateUserTasklists = async (request, response) => {
    try {
        const { 
            id, 
            tasklistId 
        } = request.params;
        const user = await User.findById(id);
        
        // If tasklist exists, Remove from user.taskList
        // If tasklist doesn't exist, Add to user.taskList
        if (user.taskLists.includes(tasklistId)) {
            user.taskLists = user.taskLists.filter((id) => id !== tasklistId);
        } else {
            user.taskLists.push(tasklistId);
        }
        await user.save();
  
        const tasklists = await Promise.all(
            user.taskLists.map((id) => Tasklist.findById(id))
        );
        const formattedTasklists = tasklists.map(
            ({ 
                _id, 
                title, 
                description, 
                lastUpdated, 
                tasks,
            }) => {
                return { 
                    _id, 
                    title, 
                    description, 
                    lastUpdated, 
                    tasks,
                };
            }
        );
  
        response.status(200).json({
            tasklists: formattedTasklists,
            msg: "Updated user's tasklists"
        });
    } catch (error) {
        response.status(404).json({ 
            msg: error.message
        });
    }
};
