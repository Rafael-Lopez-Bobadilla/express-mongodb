import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
export const addBook = async (userId: string, bookId: ObjectId) => {
  if (!ObjectId.isValid(userId)) return null;
  const validUserId = ObjectId.createFromHexString(userId);
  const user = await UserCollection.findOneAndUpdate(
    { _id: validUserId },
    { $addToSet: { books: bookId } },
    { returnDocument: "after" }
  );
  return user;
};
