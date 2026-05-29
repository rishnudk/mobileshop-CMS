import { NextFunction, Request, Response } from "express";
import { createPartySchema } from "@mobileshop/shared";
import { PartyService } from "./party.service";

export class PartyController {
  private partyService = new PartyService();

  getParties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parties = await this.partyService.getParties();
      res.status(200).json({
        success: true,
        data: parties,
      });
    } catch (error) {
      next(error);
    }
  };

  getPartyById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const party = await this.partyService.getPartyById(req.params.id);
      res.status(200).json({
        success: true,
        data: party,
      });
    } catch (error) {
      next(error);
    }
  };

  createParty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parseResult = createPartySchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({
          success: false,
          error: {
            message: "Validation failed",
            details: parseResult.error.flatten().fieldErrors,
          },
        });
        return;
      }

      const party = await this.partyService.createParty(parseResult.data);
      res.status(201).json({
        success: true,
        data: party,
      });
    } catch (error) {
      next(error);
    }
  };
}
