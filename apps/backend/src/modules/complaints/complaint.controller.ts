import { Context } from "hono";
import { ComplaintStatus } from "@prisma/client";
import { createPartyComplaintSchema, updateComplaintStatusSchema } from "@mobileshop/shared";
import { ComplaintService } from "./complaint.service";
import type { HonoVariables } from "../../types/hono";

type Ctx = Context<{ Variables: HonoVariables }>;

export class ComplaintController {
  private complaintService = new ComplaintService();

  getComplaints = async (c: Ctx): Promise<Response> => {
    try {
      const complaints = await this.complaintService.getComplaints();
      return c.json({ success: true, data: complaints }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to fetch complaints" } },
        500
      );
    }
  };

  createComplaintForParty = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = createPartyComplaintSchema.safeParse(body);
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

      const complaint = await this.complaintService.createComplaintForParty(
        c.req.param("partyId")!,
        parseResult.data
      );
      return c.json({ success: true, data: complaint }, 201);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to create complaint" } },
        500
      );
    }
  };

  assignTechnician = async (c: Ctx): Promise<Response> => {
    try {
      const user = c.get("user");
      const updatedBy = user?.email ?? "system";

      const body = await c.req.json();
      const complaint = await this.complaintService.assignTechnician(
        c.req.param("id")!,
        body.assignedTechnicianId ?? null,
        updatedBy
      );

      return c.json({ success: true, data: complaint }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to assign technician" } },
        500
      );
    }
  };

  updateStatus = async (c: Ctx): Promise<Response> => {
    try {
      const body = await c.req.json();
      const parseResult = updateComplaintStatusSchema.safeParse(body);
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

      const user = c.get("user");
      const updatedBy = user?.email ?? "system";
      const result = await this.complaintService.updateStatus(
        c.req.param("id")!,
        parseResult.data.status as ComplaintStatus,
        updatedBy
      );

      return c.json({ success: true, data: result }, 200);
    } catch (error: any) {
      return c.json(
        { success: false, error: { message: error.message || "Failed to update status" } },
        500
      );
    }
  };
}
