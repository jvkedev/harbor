import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
      maxLength: 10000,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{2}$/, "Use a 2-letter ISO country code"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

postSchema.index({ createdAt: -1 });
postSchema.index({ country: 1, createdAt: -1 });

export const Post = model("Post", postSchema);
