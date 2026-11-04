import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
      match: [/^[a-z0-9_]+$/, "Only letters, numbers and _ allowed"],
    },
    passwordHash: {
      type: String,
      maxLength: 100,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "senior", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export const User = model("User", userModel);
