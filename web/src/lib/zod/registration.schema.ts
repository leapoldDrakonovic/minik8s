import * as z from "zod"

/**
 * Zod schema for registration form validation.
 *
 * Validates the shape and rules for user registration credentials.
 * - nickname: required string, 5-32 characters.
 * - password: required string, 3-10 characters.
 * - confirm: required string, 3-10 characters (confirmation of password).
 */
export const registrationSchema = z.object({
  nickname: z
    .string()
    .min(5, "Nickname must be at least 5 characters.")
    .max(32, "Nickname must be at most 32 characters."),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters.")
    .max(10, "Password must be at most 10 characters."),
  confirm: z
    .string()
    .min(3, "Password must be at least 3 characters.")
    .max(10, "Password must be at most 10 characters."),
})