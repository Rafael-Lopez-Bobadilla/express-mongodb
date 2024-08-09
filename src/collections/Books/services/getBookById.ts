import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
export const getBookById = async (id: ObjectId) => {
  const book = await BookCollection.findOne({ _id: id });
  return book;
};
