import { z } from "zod";
import { BloodGroups } from "@/constant/bloodGroups";
import { Gender } from "@/constant/gender";

export const registrationValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string",
  }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be string",
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be string",
  }),
  gender: z.enum(Gender as [string, ...string[]], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be string",}),
  location: z.string({
    required_error: "Location is required",
    invalid_type_error: "Location must be string",
  }),
  bloodType: z.enum(BloodGroups as [string, ...string[]], {
    required_error: "Blood Group is required",
    invalid_type_error: "Blood Group must be string",
  }),
});