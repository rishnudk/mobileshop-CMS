import { Hono } from "hono";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { requireRoles } from "../../common/middleware/role.middleware";
import { UserController } from "./user.controller";
import type { HonoVariables } from "../../types/hono";

const userRoutes = new Hono<{ Variables: HonoVariables }>();
const controller = new UserController();

userRoutes.use("/*", authMiddleware);
userRoutes.get("/", (c) => controller.getUsers(c));
userRoutes.post("/", requireRoles("ADMIN"), (c) => controller.createUser(c));
userRoutes.patch("/:id", requireRoles("ADMIN"), (c) => controller.updateUser(c));
userRoutes.delete("/:id", requireRoles("ADMIN"), (c) => controller.deleteUser(c));

export default userRoutes;
