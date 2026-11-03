import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { AppError } from "../../shared/errors/AppError.js";

export interface AccessTokenPayload {
  sub: string; // user id
  role: "user" | "senior" | "admin";
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, config.auth.accessSecret, {
    algorithm: "HS256",
    expiresIn: config.auth.accessExpiresInSeconds,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  try {
    const decoded = jwt.verify(token, config.auth.accessSecret, {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string" || typeof decoded.sub !== "string") {
      throw AppError.unauthorized("Invalid token");
    }

    return {
      sub: decoded.sub,
      role: decoded.role as AccessTokenPayload["role"],
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw AppError.unauthorized("Invalid or expired token");
  }
}
