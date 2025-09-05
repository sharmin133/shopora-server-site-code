import { getDB } from "../db/connection.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const db = getDB();
    const { cartItems, shipping, paymentMethod } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const total =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      cartItems.length * 5; // shipping

    const newOrder = {
      userId,
      cartItems,
      shipping,
      paymentMethod,
      status: "Pending",
      total,
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(newOrder);

    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: result.insertedId });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const db = getDB();
    const orders = await db.collection("orders").find({}).toArray(); // সব অর্ডার
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// Get Orders created by logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const db = getDB();
    const userId = req.user.id; 

    const orders = await db
      .collection("orders")
      .find({ userId }) // logged-in user can orders
      .toArray();

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
};