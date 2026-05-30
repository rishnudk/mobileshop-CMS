import { Context } from "hono";
import { createPartySchema } from "@mobileshop/shared";
import { PartyService } from "./party.service";
import type { HonoVariables } from "../../types/hono";

type Ctx = Context<{ Variables: HonoVariables }>;

export class PartyController {
  private partyService = new PartyService();

  getParties = async (c: Ctx): Promise<Response> => {
    try {
      const parties = await this.partyService.getParties();
      return c.json({ success: true, data: parties }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to fetch parties" } },
        500
      );
    }
  };

  getPartyById = async (c: Ctx): Promise<Response> => {
    try {
      const party = await this.partyService.getPartyById(c.req.param("id")!);
      return c.json({ success: true, data: party }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to fetch party" } },
        500
      );
    }
  };

  createParty = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = createPartySchema.safeParse(body);
      if (!parseResult.success) {
        return c.json(
          {
            success: false,
            error: {
              message: "Validation failed",
              details: parseResult.error.flatten().fieldErrors,
            },
          },
          400
        );
      }

      const party = await this.partyService.createParty(parseResult.data);
      return c.json({ success: true, data: party }, 201);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to create party" } },
        500
      );
    }
  };
}
