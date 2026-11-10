import type { RequestHandler } from "express";
import { AppError } from "../../shared/errors/AppError.js";
import type { CreatePostInput } from "./post.schema.js";
import { createPost } from "./post.service.js";

export const create: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw AppError.unauthorized("Not logged in");
  }

  const post = await createPost(req.user.sub, req.body as CreatePostInput);

  res.status(201).json({
    status: "success",
    data: { post },
  });
};
