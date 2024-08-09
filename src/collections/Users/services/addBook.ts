import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
export const addBook = async (userId: ObjectId, bookId: ObjectId) => {
  const user = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { books: bookId } },
    { returnDocument: "after" }
  );
  return user;
};
