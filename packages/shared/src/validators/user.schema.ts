import { z } from "zod";

export const userRoleValues = ["ADMIN", "STAFF", "TECHNICIAN"] as const;

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(userRoleValues).default("STAFF"),
  phone: z.string().max(20, "Phone number is too long").optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  role: z.enum(userRoleValues).optional(),
  phone: z.string().max(20, "Phone number is too long").optional().nullable(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
