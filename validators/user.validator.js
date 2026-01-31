import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string({ required_error: "Name is required", invalid_type_error: "Name is required" })
        .min(1, "Name cannot be empty"),
    email: z
        .string({ required_error: "Email is required", invalid_type_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email address")
});