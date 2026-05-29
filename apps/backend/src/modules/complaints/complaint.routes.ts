import { Router } from "express";
import { ComplaintController } from "./complaint.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();
const controller = new ComplaintController();

router.use(authMiddleware);
router.get("/", controller.getComplaints);
router.post("/party/:partyId", controller.createComplaintForParty);

export default router;
