
import { getDB } from "../db/connection.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } }) // password hide
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ message: "Server error" });
  }
};