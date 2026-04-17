import { z } from "zod";
import { BloodGroups } from "@/constant/bloodGroups";
import { Gender } from "@/constant/gender";

export const registrationValidationSchema = z.object({
  name: z.string({ error: "Name is required" }),
  email: z.string({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }),
  gender: z.enum(Gender as [string, ...string[]], {
    error: "Gender is required",
  }),
  location: z.string({ error: "Location is required" }),
  bloodType: z.enum(BloodGroups as [string, ...string[]], {
    error: "Blood Group is required",
  }),
});
