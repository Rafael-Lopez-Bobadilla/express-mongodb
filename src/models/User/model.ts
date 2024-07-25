import { ObjectId } from "mongodb";
import { z } from "zod";

const User = z
  .object({
    name: z.string(),
    email: z.string(),
    age: z.number(),
    password: z.string(),
    books: z.array(z.instanceof(ObjectId)).optional(),
  })
  .strict();

export const signupSchema = User.omit({ books: true });
export type TUser = z.infer<typeof User>;
