import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { logger } from "./infrastructure/logger/logger.js";
import {
  errorHandler,
  notFoundHandler,
} from "./shared/middlewares/errorHandler.js";

import authRoutes from "./modules/auth/auth.routes.js";
import postRoutes from "./modules/posts/post.routes.js";

const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

// NOTE: Posts can be long, so this route gets its own larger body limit and must come before the global 10kb parser below.
app.use("/api/posts", express.json({ limit: "50kb" }), postRoutes);

app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => {
  res.json({
    message: "Harbor API is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
