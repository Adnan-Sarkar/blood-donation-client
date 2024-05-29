import { z } from "zod";

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: "Old Password is required",
    invalid_type_error: "Old Password must be string",
  }).min(5, "Old Password must be minimum 5 characters long"),
  newPassword: z.string({
    required_error: "New Password is required",
    invalid_type_error: "New Password must be string",
  }).min(5, "New Password must be minimum 5 characters long"),
  confirmPassword: z.string({
    required_error: "Confirm Password is required",
    invalid_type_error: "Confirm Password must be string",
  }).min(5, "Confirm Password must be minimum 5 characters long"),
});