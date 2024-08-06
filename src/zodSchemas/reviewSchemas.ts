import { z } from "zod";
export const reviewSchema = z
  .object({
    text: z.string(),
    raiting: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    bookId: z.string(),
  })
  .strict();

export const updateReviewSchema = reviewSchema.pick({ text: true });
export const getReviewsSchema = reviewSchema.pick({ bookId: true }).extend({
  raiting: z.enum(["1", "2", "3", "4", "5"]).optional(),
});
