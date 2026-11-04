import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .startsWith("mongodb"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_ACCESS_EXPIRES_SECONDS: z.coerce.number().default(900),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variable");
    for (const issue of result.error.issues) {
      console.error(` - ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }

  return result.data;
};

const env = parseEnv();

const config = {
  port: env.PORT,

  nodeEnv: env.NODE_ENV,

  logLevel: env.LOG_LEVEL,

  isProduction: env.NODE_ENV === "production",

  database: {
    uri: env.MONGODB_URI,
  },

  auth: {
    accessSecret: env.JWT_ACCESS_SECRET,
    accessExpiresInSeconds: env.JWT_ACCESS_EXPIRES_SECONDS,
  },
} as const;

export default config;
