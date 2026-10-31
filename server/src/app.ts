import express from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./shared/middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Harbor API is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
