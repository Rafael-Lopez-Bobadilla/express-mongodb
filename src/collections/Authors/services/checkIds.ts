import { ObjectId } from "mongodb";
import { AuthorsCollection } from "../collection";

type TAuthorId = { _id: ObjectId };
export const checkIds = async (ids: ObjectId[]) => {
  const authors = await AuthorsCollection.find({ _id: { $in: ids } })
    .project<TAuthorId>({ _id: 1 })
    .toArray();
  const authorsIds = authors.map((author) => author._id);
  return authorsIds;
};
