import express from "express";
import { pinoHttp } from "pino-http";
import { logger } from "./infrastructure/logger/logger.js";
import {
  errorHandler,
  notFoundHandler,
} from "./shared/middlewares/errorHandler.js";

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json());

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
