
import { z } from "zod";

// ---------------- User Schema (DB / Core Model) ----------------
export const UserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Valid email is required"),
  role: z.enum(["admin", "user"]).default("user"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  age: z.number().int().positive().optional(),
});

// Type from schema
export type User = z.infer<typeof UserSchema>;

