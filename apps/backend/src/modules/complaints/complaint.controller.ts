import { NextFunction, Request, Response } from "express";
import { createPartyComplaintSchema } from "@mobileshop/shared";
import { ComplaintService } from "./complaint.service";

export class ComplaintController {
  private complaintService = new ComplaintService();

  getComplaints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const complaints = await this.complaintService.getComplaints();
      res.status(200).json({
        success: true,
        data: complaints,
      });
    } catch (error) {
      next(error);
    }
  };

  createComplaintForParty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parseResult = createPartyComplaintSchema.safeParse(req.body);
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

      const complaint = await this.complaintService.createComplaintForParty(req.params.partyId, parseResult.data);
      res.status(201).json({
        success: true,
        data: complaint,
      });
    } catch (error) {
      next(error);
    }
  };
}
