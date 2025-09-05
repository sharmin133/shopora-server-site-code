import express from "express";
import { createProduct, getProducts, getProductById, getMyProducts } from "../controllers/productController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createProduct);  // Token validation
router.get("/", getProducts);
// Get My Products (for logged-in user)
router.get("/my-products", verifyToken, getMyProducts);
router.get("/:id", getProductById);


export default router;

