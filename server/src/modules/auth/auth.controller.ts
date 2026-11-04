import type { RequestHandler } from "express";
import { AppError } from "../../shared/errors/AppError.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { getUserById, loginUser, registerUser } from "./auth.service.js";
import { signAccessToken } from "./token.js";
import config from "../../config/config.js";

const accessCookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  samesite: "lax" as const,
};

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

export const login: RequestHandler = async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const issue = result.error.issues[0];
    throw AppError.badRequest(`${issue?.path.join(".")}: ${issue?.message}`);
  }

  const user = await loginUser(result.data);
  const token = signAccessToken({ sub: user.id, role: user.role });

  res.cookie("accessToken", token, {
    ...accessCookieOptions,
    maxAge: config.auth.accessExpiresInSeconds * 1000,
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

export const me: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw AppError.unauthorized("Not logged in");
  }

  const user = await getUserById(req.user.sub);

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

export const logout: RequestHandler = async (_req, res) => {
  res.clearCookie("accessToken", accessCookieOptions);

  res.status(200).json({
    status: "success",
    message: "Logged out",
  });
};
