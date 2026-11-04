import { z } from "zod";

const RESERVED_USERNAMES = ["admin", "root", "harbor", "support"];

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9]+$/, "Only letters, numbers and _ allowed")
    .refine((v) => !RESERVED_USERNAMES.includes(v), "Username not allowed"),
  password: z.string().min(8).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
  password: z.string().min(1).max(128),
});

export type LoginInput = z.infer<typeof loginSchema>;
