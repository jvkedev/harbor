export class AppError extends Error {
  public readonly statusCode: number;

  // NOTE: `cause` keeps the original error for server logs only.
  constructor(message: string, statusCode: number = 500, cause?: unknown) {
    super(message, { cause });
    this.name = "AppError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // Helpers for creating common HTTP errors.
  static badRequest(message = "Bad Request") {
    return new AppError(message, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new AppError(message, 403);
  }

  static notFound(message = "Resource Not Found") {
    return new AppError(message, 404);
  }

  static conflict(message = "Conflict") {
    return new AppError(message, 409);
  }

  static unprocessable(message = "Unprocessable Entity") {
    return new AppError(message, 422);
  }

  static tooManyRequests(message = "Too Many Requests") {
    return new AppError(message, 429);
  }

  static serverError(message = "Internal Server Error", cause?: unknown) {
    return new AppError(message, 500, cause);
  }

  static serviceUnavailable(message = "Service Unavailable", cause?: unknown) {
    return new AppError(message, 503, cause);
  }
}
