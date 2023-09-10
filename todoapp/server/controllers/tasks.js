import Task from "../models/Task.js";
import Tasklist from "../models/Tasklist.js";
import User from "../models/User.js";

/* CREATE */
export const createTask = async (request, response) => {
    try {
        const { userId, tasklistId, } = request.param;

        const { completed, date, type, priority, content } =
            request.body;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);

        const newTask = new Task({
            tasklistId: tasklistId,
            completed: completed,
            date: date,
            type: type,
            priority: priority,
            content: content,
        });
        await newTask.save();

        const queriedTask = await Task.findOne(newTask);
        tasklist.tasks = tasklist.tasks.push(queriedTask._id);

        response.status(201).json({
            user: user,
            tasklist: tasklist,
            newTask: queriedTask,
            msg: "Created new task",
        });
    } catch (err) {
        response.status(409).json({
            msg: err.message,
        });
    }
};

export const getTasks = async (request, response) => {
    try {
        const { userId, tasklistId } = request.body;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);

        const tasks = await Task.find({
            tasklistId: tasklistId,
        });
        response.status(200).json({
            user: user,
            tasklist: tasklist,
            tasks: tasks,
            msg: `Retrieved tasks for tasklist ${tasklistId}`,
        });
    } catch (err) {
        response.status(404).json({
            msg: err.message,
        });
    }
};

/* UPDATE */
export const updateTask = async (request, response) => {
    try {
        const { userId, tasklistId, taskId } = request.param;
        const { completed, date, type, priority, content } = request.body;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);

        const task = await Task.findById(taskId);
        task.completed = completed;
        task.date = date;
        task.type = type;
        task.priority = priority;
        task.content = content;
        await task.save();

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                completed: task.completed,
                date: task.date,
                type: task.type,
                priority: task.priority,
                content: task.content,
            },
            {
                new: true,
            }
        );

        response.status(200).json({
            user: user,
            tasklist: tasklist,
            task: updatedTask,
            msg: `Updated task ${taskId} for tasklist ${tasklistId}`,
        });
    } catch (err) {
        response.status(404).json({ msg: err.message });
    }
};

export const deleteTask = async (request, response) => {
    try {
        const { userId, tasklistId, taskId } = request.param;
        // const { completed, date, type, priority, content } = request.body;

        const user = await User.findById(userId);

        const tasklist = await Tasklist.findById(tasklistId);

        // Delete the task
        await Task.findByIdAndDelete(taskId);
        // Remove the deleted task's id from tasklist's tasks
        tasklist.tasks = tasklist.tasks.filter((id) => id !== taskId);
        await tasklist.save();

        const tasks = await Promise.all(
            tasklist.tasks.map((id) => Task.findById(id))
        );
        const formattedTasks = tasks.map(
            ({
                _id,
                tasklistId,
                completed,
                date,
                type,
                priority,
                content
            }) => {
                return {
                    _id,
                    tasklistId,
                    completed,
                    date,
                    type,
                    priority,
                    content
                };
            }
        );

        response.status(200).json({
            user: user,
            tasklist: tasklist,
            tasks: formattedTasks,
            msg: `Deleted task ${taskId} for tasklist ${tasklistId}`,
        });
    } catch (err) {
        response.status(404).json({ msg: err.message });
    }
};
