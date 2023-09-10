import User from "../models/User.js";
import Tasklist from "../models/Tasklist.js";
import Task from "../models/Task.js";

export const createTasklist = async (request, response) => {
    try {
        const { userId } = request.param;

        const { title, description, lastUpdated } = request.body;

        const user = await User.findById(userId);

        const newTasklist = new Tasklist({
            userId: userId,
            title: title,
            description: description,
            lastUpdated: lastUpdated,
            tasks: [],
        });
        await newTasklist.save();
        // Add new tasklist's id to user's taskLists
        const queriedTasklist = await Tasklist.findOne(newTasklist);
        user.taskLists = user.taskLists.push(queriedTasklist._id);
        await user.save();

        const usersTasklists = await Tasklist.find({ userId: userId });

        response.status(201).json({
            user: user,
            usersTasklists: usersTasklists,
            newTasklist: queriedTasklist,
            msg: "Created new tasklist",
        });
    } catch (err) {
        response.status(409).json({
            msg: err.message,
        });
    }
};

export const getTasklist = async (request, response) => {
    try {
        const { userId, tasklistId } = request.params;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);

        const tasks = await Promise.all(
            tasklist.tasks.map((id) => Task.findById(id))
        );
        const formattedTasks = tasks.map(
            ({ _id, completed, date, type, priority, content }) => {
                return {
                    _id,
                    completed,
                    date,
                    type,
                    priority,
                    content,
                };
            }
        );

        response.status(200).json({
            user: user,
            tasklist: tasklist,
            tasks: formattedTasks,
            msg: "Retrieved a tasklist and its tasks",
        });
    } catch (error) {
        response.status(404).json({ msg: error.msg });
    }
};

export const updateTasklist = async (request, response) => {
    try {
        const { userId, tasklistId } = request.params;

        const { title, description, lastUpdated, tasks } = request.body;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);
        tasklist.title = title;
        tasklist.description = description;
        tasklist.lastUpdated = lastUpdated;
        tasklist.tasks = tasks;
        await tasklist.save();

        response.status(200).json({
            user: user,
            tasklist: tasklist,
            msg: `Updated tasklist ${tasklist}`,
        });
    } catch (error) {
        response.status(404).json({
            msg: error.message,
        });
    }
};

export const deleteTasklist = async (request, response) => {
    try {
        const { userId, tasklistId } = request.param;

        // const { title, description, lastUpdated, tasks } = request.body;

        const user = await User.findById(userId);

        // Remove the tasklist
        await Tasklist.findByIdAndDelete(tasklistId);
        // Remove all tasks that were part of the tasklist
        await Task.deleteMany({
            tasklistId: tasklistId,
        })
        // Remove the deleted tasklist's id from user's taskList
        user.taskLists = user.taskLists.filter((id) => id !== tasklistId);
        await user.save();

        response.status(200).json({
            user: user,
            msg: `Deleted tasklist ${tasklistId} and its tasks`,
        });
    } catch (err) {
        response.status(404).json({ msg: err.message });
    }
};

