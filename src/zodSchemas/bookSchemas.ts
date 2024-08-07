import { z } from "zod";
export const bookSchema = z
  .object({
    name: z.string(),
    authors: z.array(z.string()).nonempty(),
    category: z.string(),
  })
  .strict();

export const queryParamsSchema = bookSchema
  .omit({ authors: true })
  .extend({ author: z.string() })
  .partial()
  .strip();

export type TQueryParams = z.infer<typeof queryParamsSchema>;
