import { Router } from "express";

import { authMiddleware } from "../../common/middleware/auth.middleware";
import { requireRoles } from "../../common/middleware/role.middleware";
import { UserController } from "./user.controller";

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get("/", controller.getUsers);
router.post("/", requireRoles("ADMIN"), controller.createUser);
router.patch("/:id", requireRoles("ADMIN"), controller.updateUser);
router.delete("/:id", requireRoles("ADMIN"), controller.deleteUser);

export default router;
