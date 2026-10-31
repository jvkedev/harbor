import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../errors/AppError.js";
import { logger } from "../../infrastructure/logger/logger.js";

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(AppError.notFound("Route not found"));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Convert known request errors into consistent application errors.
  let appErr: AppError;

  if (err instanceof AppError) {
    appErr = err;
  } else if (err?.type === "entity.parse.failed") {
    appErr = AppError.badRequest("Invalid JSON");
  } else if (err?.type === "entity.too.large") {
    appErr = new AppError("Payload too large", 413);
  } else {
    appErr = AppError.serverError("Something went wrong", err);
  }

  // NOTE: Log the full error (including cause) on the server only.
  const log = { err, path: req.path, method: req.method };
  if (appErr.statusCode >= 500) {
    logger.error(log, "request failed");
  } else logger.warn(log, "client error");

  // NOTE: Send only a safe message to the client, never the cause or stack.
  const message =
    appErr.statusCode < 500 ? appErr.message : "Something went wrong";

  res.status(appErr.statusCode).json({ status: "error", message });
};
