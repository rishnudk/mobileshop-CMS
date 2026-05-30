import { Hono } from "hono";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { requireRoles } from "../../common/middleware/role.middleware";
import { SettingsController } from "./settings.controller";
import type { HonoVariables } from "../../types/hono";

const settingsRoutes = new Hono<{ Variables: HonoVariables }>();
const controller = new SettingsController();

settingsRoutes.use("/*", authMiddleware);
settingsRoutes.get("/", (c) => controller.getSettings(c));
settingsRoutes.put("/", requireRoles("ADMIN"), (c) => controller.updateSettings(c));

export default settingsRoutes;
