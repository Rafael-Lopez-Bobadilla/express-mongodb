import { ObjectId } from "mongodb";
import { ReviewCollection } from "../collection";
export const getBookReviews = async (
  bookId: ObjectId,
  limit: number,
  raiting?: number
) => {
  const reviews = await ReviewCollection.find({ bookId, raiting })
    .limit(limit)
    .toArray();
  return reviews;
};
