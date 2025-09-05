import express from "express";

import { createOrder, getMyOrders, getOrders } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.post("/", verifyToken, createOrder);   // Create new order
router.get("/", verifyToken, getOrders);
     router.get("/my-orders", verifyToken, getMyOrders);

export default router;