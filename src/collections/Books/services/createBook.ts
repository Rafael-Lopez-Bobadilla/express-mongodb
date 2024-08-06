import { BookCollection, IBook } from "../collection";
export const createBook = async (newBook: IBook) => {
  const result = await BookCollection.insertOne(newBook);
  return result.insertedId;
};
