import { ObjectId } from "mongodb";
import { ReviewCollection } from "../collection";
export const updateReview = async (id: string, text: string) => {
  if (!ObjectId.isValid(id)) return null;
  const reviewId = ObjectId.createFromHexString(id);
  const review = await ReviewCollection.findOneAndUpdate(
    { _id: reviewId },
    { $set: { text } },
    { returnDocument: "after" }
  );
  return review;
};
