import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { logger } from "./infrastructure/logger/logger.js";
import {
  errorHandler,
  notFoundHandler,
} from "./shared/middlewares/errorHandler.js";

const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => {
  res.json({
    message: "Harbor API is running",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
