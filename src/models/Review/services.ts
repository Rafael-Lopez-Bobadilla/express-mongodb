import { ClientSession } from "mongodb";
import { IReview, ReviewCollection } from "./model";

const reviewService = {
  createReview: async (review: IReview, session: ClientSession) => {
    const result = await ReviewCollection.insertOne(review, { session });
    return result.insertedId;
  },
};

export default reviewService;
