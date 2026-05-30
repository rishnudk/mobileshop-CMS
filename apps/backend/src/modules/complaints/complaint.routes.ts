import { Hono } from "hono";
import { ComplaintController } from "./complaint.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import type { HonoVariables } from "../../types/hono";

const complaintRoutes = new Hono<{ Variables: HonoVariables }>();
const controller = new ComplaintController();

complaintRoutes.use("/*", authMiddleware);
complaintRoutes.get("/", (c) => controller.getComplaints(c));
complaintRoutes.post("/party/:partyId", (c) => controller.createComplaintForParty(c));
complaintRoutes.patch("/:id/assign", (c) => controller.assignTechnician(c));
complaintRoutes.patch("/:id/status", (c) => controller.updateStatus(c));

export default complaintRoutes;
