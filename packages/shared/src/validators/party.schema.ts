import { z } from "zod";

export const PartyType = {
  INDIVIDUAL: "INDIVIDUAL",
  SHOP: "SHOP",
} as const;

export type PartyTypeValue = keyof typeof PartyType;

export const createPartySchema = z.object({
  type: z.nativeEnum(PartyType).default(PartyType.INDIVIDUAL),
  name: z.string().min(1, "Party name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  alternatePhone: z.string().max(15, "Alternate phone number is too long").optional().nullable(),
  address: z.string().max(500, "Address is too long").optional().nullable(),
  contactPerson: z.string().max(120, "Contact person is too long").optional().nullable(),
});

export type CreatePartyInput = z.infer<typeof createPartySchema>;

export const updatePartySchema = createPartySchema.partial();

export type UpdatePartyInput = z.infer<typeof updatePartySchema>;
