import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .trim(),
  password: z
    .string()
    .min(8)
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    })
    .trim(),
});
