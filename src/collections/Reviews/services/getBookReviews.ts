import { Filter } from "mongodb";
import { IReview, ReviewCollection } from "../collection";
export const getBookReviews = async (query: Filter<IReview>, limit: number) => {
  const reviews = await ReviewCollection.find(query).limit(limit).toArray();
  return reviews;
};
