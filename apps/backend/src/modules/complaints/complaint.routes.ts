import { Router } from "express";
import { ComplaintController } from "./complaint.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();
const controller = new ComplaintController();

router.use(authMiddleware);
router.get("/", controller.getComplaints);
router.post("/party/:partyId", controller.createComplaintForParty);
router.patch("/:id/assign", controller.assignTechnician);
router.patch("/:id/status", controller.updateStatus);

export default router;
