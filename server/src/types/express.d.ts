import type { AccessTokenPayload } from "../modules/auth/token.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
