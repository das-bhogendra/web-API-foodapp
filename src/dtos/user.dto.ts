import { z } from "zod";

/**
 * CREATE USER DTO (Register)
 */
export const CreateUserDto = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateUserDto = z.infer<typeof CreateUserDto>;

/**
 * UPDATE USER DTO (Partial Update)
 */
export const UpdateUserDto = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

/**
 * LOGIN USER DTO
 */
export const LoginUserDto = z.object({
  username: z.string().min(3, "Username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginUserDto = z.infer<typeof LoginUserDto>;
