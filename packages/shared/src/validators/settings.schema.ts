import { z } from "zod";

export const appSettingsSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopPhone: z.string().min(1, "Shop phone is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  complaintPrefix: z.string().min(1, "Complaint prefix is required").max(10, "Complaint prefix is too long"),
  defaultCurrency: z.string().min(1, "Currency is required").max(10, "Currency code is too long"),
  enableWhatsappNotifications: z.boolean().default(false),
});

export type AppSettingsInput = z.infer<typeof appSettingsSchema>;
