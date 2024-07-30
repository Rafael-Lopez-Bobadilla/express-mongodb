import { ClientSession } from "mongodb";
import { db } from "../../db";
import { TReview } from "./model";

const Book = db.collection<TReview>("review");

const reviewService = {
  createReview: async (review: TReview, session: ClientSession) => {
    const result = await Book.insertOne(review, { session });
    return result.insertedId;
  },
};

export default reviewService;
