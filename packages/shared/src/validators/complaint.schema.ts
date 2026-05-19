import { z } from "zod";

export const ComplaintStatus = {
  PENDING: "PENDING",
  DIAGNOSING: "DIAGNOSING",
  REPAIRING: "REPAIRING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type ComplaintStatusType = keyof typeof ComplaintStatus;

export const UserRole = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  TECHNICIAN: "TECHNICIAN",
} as const;

export type UserRoleType = keyof typeof UserRole;

export const createComplaintSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  deviceBrand: z.string().min(1, "Device brand is required"),
  deviceModel: z.string().min(1, "Device model is required"),
  imei: z.string().optional().or(z.literal("")),
  issueDescription: z.string().min(1, "Issue description is required"),
  estimatedCost: z.number().min(0, "Estimated cost must be 0 or greater").default(0),
  advancePaid: z.number().min(0, "Advance paid must be 0 or greater").default(0),
  assignedTechnicianId: z.string().optional().nullable(),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;

export const updateComplaintSchema = z.object({
  customerName: z.string().min(1, "Customer name is required").optional(),
  customerPhone: z.string().min(10).max(15).optional(),
  deviceBrand: z.string().min(1).optional(),
  deviceModel: z.string().min(1).optional(),
  imei: z.string().optional().nullable(),
  issueDescription: z.string().min(1).optional(),
  status: z.nativeEnum(ComplaintStatus).optional(),
  estimatedCost: z.number().min(0).optional(),
  advancePaid: z.number().min(0).optional(),
  assignedTechnicianId: z.string().optional().nullable(),
});

export type UpdateComplaintInput = z.infer<typeof updateComplaintSchema>;
