import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Optional: only admin can see all users
router.get("/", verifyToken, getAllUsers);

export default router;