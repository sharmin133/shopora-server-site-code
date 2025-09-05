import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export const getDB = () => db;
