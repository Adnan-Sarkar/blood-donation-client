import { z } from "zod";

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: "Old Password is required",
    invalid_type_error: "Old Password must be string",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
    invalid_type_error: "New Password must be string",
  }),
  confirmPassword: z.string({
    required_error: "Confirm Password is required",
    invalid_type_error: "Confirm Password must be string",
  }),
});