import { Hono } from "hono";
import { PartyController } from "./party.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import type { HonoVariables } from "../../types/hono";

const partyRoutes = new Hono<{ Variables: HonoVariables }>();
const controller = new PartyController();

partyRoutes.use("/*", authMiddleware);
partyRoutes.get("/", (c) => controller.getParties(c));
partyRoutes.get("/:id", (c) => controller.getPartyById(c));
partyRoutes.post("/", (c) => controller.createParty(c));

export default partyRoutes;
