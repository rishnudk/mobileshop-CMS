import { Router } from "express";
import { PartyController } from "./party.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();
const controller = new PartyController();

router.use(authMiddleware);
router.get("/", controller.getParties);
router.get("/:id", controller.getPartyById);
router.post("/", controller.createParty);

export default router;
