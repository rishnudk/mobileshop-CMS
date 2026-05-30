import { Router } from "express";

import { authMiddleware } from "../../common/middleware/auth.middleware";
import { requireRoles } from "../../common/middleware/role.middleware";
import { SettingsController } from "./settings.controller";

const router = Router();
const controller = new SettingsController();

router.use(authMiddleware);

router.get("/", controller.getSettings);
router.put("/", requireRoles("ADMIN"), controller.updateSettings);

export default router;
