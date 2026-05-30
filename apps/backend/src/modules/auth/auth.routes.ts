import { Hono } from "hono";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import type { HonoVariables } from "../../types/hono";

const authRoutes = new Hono<{ Variables: HonoVariables }>();
const controller = new AuthController();

authRoutes.post("/login", (c) => controller.login(c));
authRoutes.get("/me", authMiddleware, (c) => controller.getMe(c));

export default authRoutes;
