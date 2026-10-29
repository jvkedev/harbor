export interface ErrorDetail {
  field?: string;
  message: string;
}

interface AppErrorOptions {
  isOperational?: boolean;
  details?: ErrorDetail[];
  cause?: unknown;
}

function sanitizeDetails(details?: ErrorDetail[]): ErrorDetail[] | undefined {
  if (!details?.length) return undefined;

  // Keep client-provided validation details small and bounded.
  return details.slice(0, 20).map((d) => ({
    ...(d.field ? { field: String(d.field).slice(0, 100) } : {}),
    message: String(d.message).slice(0, 200),
  }));
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: ErrorDetail[];

  constructor(
    message: string,
    statusCode: number = 500,
    options: AppErrorOptions = {},
  ) {
    super(
      message,
      options.cause === undefined ? undefined : { cause: options.cause },
    );
    this.name = "AppError";
    // Fall back to a server error for invalid HTTP status codes.
    this.statusCode =
      Number.isInteger(statusCode) && statusCode >= 400 && statusCode <= 599
        ? statusCode
        : 500;
    this.isOperational = options.isOperational ?? true;
    this.details =
      this.statusCode < 500 ? sanitizeDetails(options.details) : undefined;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    const isServerError = this.statusCode >= 500;
    return {
      status: "error",
      // Avoid exposing internal messages in API responses.
      message: isServerError ? "Internal Server Error" : this.message,
      ...(this.details ? { details: this.details } : {}),
    };
  }

  // Helpers for creating common HTTP errors.
  static badRequest(message = "Bad Request", details?: ErrorDetail[]) {
    return new AppError(message, 400, { details });
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

  static unprocessable(
    message = "Unprocessable Entity",
    details?: ErrorDetail[],
  ) {
    return new AppError(message, 422, { details });
  }

  static tooManyRequests(message = "Too Many Requests") {
    return new AppError(message, 429);
  }

  static serverError(message = "Internal Server Error", cause?: unknown) {
    return new AppError(message, 500, { cause });
  }

  static serviceUnavailable(message = "Service Unavailable", cause?: unknown) {
    return new AppError(message, 503, { cause });
  }
}
