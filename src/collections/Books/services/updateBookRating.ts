import { ObjectId } from "mongodb";
import { ClientSession } from "mongodb";
import { BookCollection } from "../collection";
export const updateBookRating = async (
  bookId: ObjectId,
  newRating: number,
  session: ClientSession
) => {
  const result = await BookCollection.updateOne(
    { _id: bookId },
    {
      $inc: { reviews: 1 },
      $set: { rating: newRating },
    },
    { session }
  );
  return result;
};
