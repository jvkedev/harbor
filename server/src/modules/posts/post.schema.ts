import { z } from "zod";
import countries from "i18n-iso-countries";

export const createPostSchema = z.object({
  title: z.string().trim().min(5).max(100),
  body: z.string().trim().min(20).max(10000),
  country: z
    .string()
    .trim()
    .toUpperCase()
    .refine((code) => countries.isValid(code), "Invalid ISO country code"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
