import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
export const checkBookId = async (id: ObjectId) => {
  const book = await BookCollection.find({ _id: id })
    .project({ _id: 1 })
    .toArray();
  return book[0];
};
