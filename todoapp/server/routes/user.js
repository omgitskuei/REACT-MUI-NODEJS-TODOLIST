import express from "express";
import {
    getUser,
    getUserTasklists,
    UpdateUserTasklists,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);                       // this is /user/:id
router.get("/:id/tasklists", verifyToken, getUserTasklists);    // this is /user/:id/tasklists

/* UPDATE */
router.patch("/:id/:tasklistId", verifyToken, UpdateUserTasklists);

export default router;
