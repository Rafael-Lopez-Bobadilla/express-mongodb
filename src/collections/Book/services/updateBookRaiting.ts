import { ObjectId } from "mongodb";
import { ClientSession } from "mongodb";
import { BookCollection } from "../collection";
export const updateBookRaiting = async (
  bookId: ObjectId,
  newRaiting: number,
  session?: ClientSession
) => {
  const result = await BookCollection.updateOne(
    { _id: bookId },
    {
      $inc: { reviews: 1 },
      $set: { raiting: newRaiting },
    },
    { session }
  );
  return result;
};
