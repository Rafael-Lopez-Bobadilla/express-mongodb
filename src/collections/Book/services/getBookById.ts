import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
import CustomError from "../../../utils/CustomError";
export const getBookById = async (id: string) => {
  const bookId = ObjectId.createFromHexString(id);
  const book = await BookCollection.findOne({ _id: bookId });
  if (!book) throw new CustomError("no book", 400);
  return book;
};
