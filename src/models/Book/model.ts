import { z } from "zod";

const Book = z
  .object({
    name: z.string(),
    reviews: z.number(),
    raiting: z.number(),
  })
  .strict();

export const newBookSchema = Book.pick({ name: true });
export type TBook = z.infer<typeof Book>;
