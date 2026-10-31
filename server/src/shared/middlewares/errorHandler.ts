import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../errors/AppError.js";
import { logger } from "../../infrastructure/logger/logger.js";

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(AppError.notFound("Route not found"));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const isKnown = err instanceof AppError;
  const statusCode = isKnown ? err.statusCode : 500;
  const message =
    isKnown && statusCode < 500 ? err.message : "Something went wrong";

  logger.error({ err, path: req.path, method: req.method }, "request failed");

  res.status(statusCode).json({ status: "error", message });
};
