import { ObjectId } from "mongodb";
import { ReviewCollection } from "../collection";
export const updateReview = async (
  userId: ObjectId,
  reviewId: ObjectId,
  text: string
) => {
  const review = await ReviewCollection.findOneAndUpdate(
    { _id: reviewId, "user.id": userId },
    { $set: { text } },
    { returnDocument: "after" }
  );
  return review;
};
