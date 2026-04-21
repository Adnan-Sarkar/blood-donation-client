import { z } from "zod";

export const donationRequestValidationSchema = z.object({
  phoneNumber: z
    .string({ error: "Contact number is required" })
    .regex(/^\d{10,15}$/, { error: "Enter a valid 10–15 digit phone number" }),
  hospitalName: z
    .string({ error: "Hospital name is required" })
    .min(1, { error: "Hospital name is required" })
    .max(255, { error: "Hospital name must be under 255 characters" }),
  hospitalAddress: z
    .string({ error: "Hospital address is required" })
    .min(1, { error: "Hospital address is required" }),
  reason: z
    .string({ error: "Donation reason is required" })
    .min(1, { error: "Donation reason is required" })
    .max(1000, { error: "Reason must be under 1000 characters" }),
  dateOfDonation: z.string().optional(),
  timeOfDonation: z.string().optional(),
});

export type TDonationRequestForm = z.infer<typeof donationRequestValidationSchema>;
