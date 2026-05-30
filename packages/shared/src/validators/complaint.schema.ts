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

export const createPartyComplaintSchema = z.object({
  ownerName: z.string().min(1, "Owner name is required"),
  ownerPhone: z.string().min(10, "Owner phone number must be at least 10 digits").max(15, "Owner phone number is too long"),
  deviceBrand: z.string().min(1, "Device brand is required"),
  deviceModel: z.string().min(1, "Device model is required"),
  deviceColor: z.string().max(80, "Device color is too long").optional().nullable(),
  imei: z.string().max(30, "IMEI is too long").optional().nullable(),
  issueDescription: z.string().min(1, "Issue description is required"),
  accessoriesReceived: z.string().max(500, "Accessories field is too long").optional().nullable(),
  deviceCondition: z.string().max(500, "Condition note is too long").optional().nullable(),
  estimatedCost: z.number().min(0, "Estimated cost must be 0 or greater").default(0),
  advancePaid: z.number().min(0, "Advance paid must be 0 or greater").default(0),
  assignedTechnicianId: z.string().optional().nullable(),
});

export type CreatePartyComplaintInput = z.infer<typeof createPartyComplaintSchema>;

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

export const updateComplaintStatusSchema = z.object({
  status: z.nativeEnum(ComplaintStatus),
});

export type UpdateComplaintStatusInput = z.infer<typeof updateComplaintStatusSchema>;
