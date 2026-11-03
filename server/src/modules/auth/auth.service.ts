import argon2 from "argon2";
import { User } from "../users/user.model.js";
import { AppError } from "../../shared/errors/AppError.js";
import type { RegisterInput } from "./auth.schema.js";

export async function registerUser(input: RegisterInput) {
  const passwordHash = await argon2.hash(input.password);

  try {
    const user = await User.create({
      email: input.email,
      username: input.username,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      throw AppError.conflict("Email or username already exists");
    }

    throw err;
  }
}
