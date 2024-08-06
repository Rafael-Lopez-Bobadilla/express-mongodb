import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
export const getBookById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const bookId = ObjectId.createFromHexString(id);
  const book = await BookCollection.findOne({ _id: bookId });
  return book;
};
