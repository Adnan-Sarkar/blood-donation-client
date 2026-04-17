import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }),
});
