import { ObjectId } from "mongodb";
import { AuthorsCollection } from "../collection";

type TAuthorId = { _id: ObjectId };
export const checkIds = async (ids: string[]) => {
  const validIds = ids.filter((id) => ObjectId.isValid(id));
  if (ids.length !== validIds.length) return null;
  const authorsIds = validIds.map((id) => ObjectId.createFromHexString(id));
  const authors = await AuthorsCollection.find({ _id: { $in: authorsIds } })
    .project<TAuthorId>({ _id: 1 })
    .toArray();
  return authors;
};
