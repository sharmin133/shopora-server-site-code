import { getDB } from "../db/connection.js";
import { ObjectId } from "mongodb";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const db = getDB();
    const product = req.body;

    // Optional: attach user info
    if (req.user) product.createdBy = req.user.id;

    const result = await db.collection("products").insertOne(product);

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


// Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};



// Get Products created by logged-in user
export const getMyProducts = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.user.id; // verifyToken middleware এ user attach আছে

    const products = await db
      .collection("products")
      .find({ createdBy: userId })
      .toArray();

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your products" });
  }
};

