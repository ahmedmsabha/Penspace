import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Comment must be at least 5 characters" }),
  postId: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val)),
});
