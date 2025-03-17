import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .trim(),
  password: z.string().trim(),
});
