import type { RequestHandler } from "express";
import { AppError } from "../../shared/errors/AppError.js";
import { registerSchema } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";

export const register: RequestHandler = async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const issue = result.error.issues[0];
    throw AppError.badRequest(`${issue?.path.join(".")}: ${issue?.message}`);
  }

  const user = await registerUser(result.data);

  res.status(201).json({
    status: "success",
    data: { user },
  });
};
