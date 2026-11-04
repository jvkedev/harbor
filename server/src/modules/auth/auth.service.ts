import argon2 from "argon2";
import { User } from "../users/user.model.js";
import { AppError } from "../../shared/errors/AppError.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

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

// NOTE: Fake hash so verify still runs when the email is not found (hides timing).
const DUMMY_HASH = await argon2.hash("dummy-password");

export async function loginUser(input: LoginInput) {
  const user = await User.findOne({ email: input.email }).select(
    "+passwordHash",
  );

  const isValid = await argon2.verify(
    user?.passwordHash ?? DUMMY_HASH,
    input.password,
  );

  if (!user || !isValid) {
    throw AppError.unauthorized("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

export async function getUserById(id: string) {
  const user = await User.findById(id);

  if (!user) {
    throw AppError.unauthorized("User no longer exists");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}
