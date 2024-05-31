import { z } from "zod";

export const donationRequestValidationSchema = z.object({
  phoneNumber: z.string({
    required_error: "Contact number is required",
    invalid_type_error: "Contact number must be string",
  }).min(1, "Contact number is required"),
  hospitalName: z.string({
    required_error: "Hospital name is required",
    invalid_type_error: "Hospital name must be string",
  }).min(1, "Hospital name is required"),
  hospitalAddress: z.string({
    required_error: "Hospital address is required",
    invalid_type_error: "Hospital address must be string",
  }).min(1, "Hospital address is required"),
  reason: z.string({
    required_error: "Donation reason is required",
    invalid_type_error: "Donation reason must be string",
  }).min(1, "Donation reason is required"),
  dateOfDonation: z.string({
    required_error: "Donation date is required",
    invalid_type_error: "Donation date must be string",
  }).min(1, "Donation date is required"),
  timeOfDonation: z.any().optional(),
});