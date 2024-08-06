import { IReview, ReviewCollection } from "../collection";
import { ClientSession } from "mongodb";
export const createReview = async (
  review: IReview,
  session?: ClientSession
) => {
  const result = await ReviewCollection.insertOne(review, { session });
  return result.insertedId;
};
