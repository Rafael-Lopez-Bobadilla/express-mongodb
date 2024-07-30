import { ObjectId } from "mongodb";
import { z } from "zod";

const reviewUser = z.object({
  name: z.string(),
  id: z.instanceof(ObjectId),
});

const Review = z
  .object({
    text: z.string(),
    raiting: z.number(),
    createdAt: z.instanceof(Date),
    user: reviewUser,
    bookId: z.instanceof(ObjectId),
  })
  .strict();
export const newReviewSchema = Review.omit({
  user: true,
  createdAt: true,
}).merge(
  z.object({
    bookId: z.string(),
  })
);
export type TReview = z.infer<typeof Review>;
