import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
export const addBook = async (userId: string, bookId: string) => {
  const validBookId = ObjectId.createFromHexString(bookId);
  const validUserId = ObjectId.createFromHexString(userId);
  const user = await UserCollection.findOneAndUpdate(
    { _id: validUserId },
    { $push: { books: validBookId } },
    { returnDocument: "after" }
  );
  return user;
};
