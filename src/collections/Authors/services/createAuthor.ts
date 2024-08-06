import { AuthorsCollection, IAuthor } from "../collection";
export const createAuthor = async (newAuthor: IAuthor) => {
  const result = await AuthorsCollection.insertOne(newAuthor);
  return result.insertedId;
};
