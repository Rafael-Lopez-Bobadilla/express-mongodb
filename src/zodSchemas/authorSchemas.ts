import { z } from "zod";
export const authorSchema = z.object({
  name: z.string(),
  age: z.number(),
});
