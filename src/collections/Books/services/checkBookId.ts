import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
export const checkBookId = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const bookId = ObjectId.createFromHexString(id);
  const book = await BookCollection.find({ _id: bookId })
    .project({ _id: 1 })
    .toArray();
  return book[0];
};
