import mongoose from "mongoose";
import env from "../../config/config.js";

export async function connectDB(): Promise<void> {
  const uri = env.database.uri;

  if (!uri) {
    console.error("MONGODB_URI is missing");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}
