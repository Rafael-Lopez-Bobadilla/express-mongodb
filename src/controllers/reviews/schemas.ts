import { z } from "zod";
export const reviewSchema = z
  .object({
    text: z.string(),
    raiting: z.number(),
    bookId: z.string(),
  })
  .strict();
