import { Router } from "express";
import { login, logout, me, register } from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";
import { validateBody } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;
