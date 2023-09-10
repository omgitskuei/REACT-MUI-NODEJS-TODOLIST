import express from "express";
import {
    getUser,
    getUserTasklists,
} from "../controllers/users.js";

import {
    createTasklist,
    getTasklist,
    updateTasklist,
    deleteTasklist,
} from "../controllers/tasklists.js";

import { 
    createTask,
    getTasks,
    updateTask,
    deleteTask, 
} from "../controllers/tasks.js";

import { verifyToken } from "../middleware/auth.js";



const router = express.Router();

/* CREATE */
router.post("/:userId/tasklists/", verifyToken, createTasklist);
router.post("/:userId/tasklists/:tasklistId/tasks/", verifyToken, createTask);

/* READ */
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/tasklists", verifyToken, getUserTasklists);
router.get("/:userId/tasklists/:tasklistId", verifyToken, getTasklist);
router.get("/:userId/tasklists/:tasklistId/tasks/", verifyToken, getTasks);

/* UPDATE */
router.patch("/:userId/tasklists/:tasklistId", verifyToken, updateTasklist);
router.patch("/:userId/tasklists/:tasklistId/tasks/:taskId", verifyToken, updateTask);

/* DELETE */
router.delete("/:userId/tasklists/:tasklistId/", verifyToken, deleteTasklist);
router.delete("/:userId/tasklists/:tasklistId/tasks/:taskId", verifyToken, deleteTask);
export default router;
