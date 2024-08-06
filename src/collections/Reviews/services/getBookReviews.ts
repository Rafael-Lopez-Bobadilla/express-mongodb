import { ObjectId } from "mongodb";
import { ReviewCollection } from "../collection";
export const getBookReviews = async (
  id: string,
  limit: number,
  raiting?: number
) => {
  if (!ObjectId.isValid(id)) return null;
  const bookId = ObjectId.createFromHexString(id);
  const reviews = await ReviewCollection.find({ bookId, raiting })
    .limit(limit)
    .toArray();
  return reviews;
};
