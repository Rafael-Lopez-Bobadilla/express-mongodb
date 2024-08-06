import { z } from "zod";
export const bookSchema = z
  .object({
    name: z.string(),
    authors: z.array(z.string()),
  })
  .strict();
