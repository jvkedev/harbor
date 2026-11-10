import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import { validateBody } from "../../shared/middlewares/validate.js";
import { createPostSchema } from "./post.schema.js";
import { create } from "./post.controller.js";

const router = Router();

router.post("/", requireAuth, validateBody(createPostSchema), create);

export default router;
