import type { RequestHandler } from "express";
import { AppError } from "../../shared/errors/AppError.js";
import { verifyAccessToken } from "./token.js";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.accessToken;

  if (typeof token !== "string" || token === "") {
    throw AppError.unauthorized("Not logged in");
  }

  req.user = verifyAccessToken(token);
  next();
};
