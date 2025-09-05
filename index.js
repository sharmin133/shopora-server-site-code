import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connection.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


