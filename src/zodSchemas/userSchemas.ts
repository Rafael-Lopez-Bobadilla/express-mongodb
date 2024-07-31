import { z } from "zod";
export const signupSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    age: z.number(),
    password: z.string(),
  })
  .strict();

export const loginSchema = signupSchema.pick({ email: true, password: true });

export const bookIdSchema = z.object({ bookId: z.string() });
