import { getDB } from "../db/connection.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const db = getDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👉 role always "user" by default
    const newUser = {
      name,
      email,
      password: hashedPassword,
      photo,
      role: "user",        // ✅ Default role
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId, role: "user" }, // token role
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: result.insertedId, name, email, photo, role: "user" }, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const db = getDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Include user info for frontend
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,  // ✅ role send 
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};