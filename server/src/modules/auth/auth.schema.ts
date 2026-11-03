import { z } from "zod";

const RESERVED_USERNAMES = ["admin", "root", "harbor", "support"];

export const registerSchema = z.object({
  email: z.string().trim().lowercase().pipe(z.email().max(254)),
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
