import { ObjectId } from "mongodb";
import { AuthorsCollection } from "../collection";
export const checkIds = async (ids: string[]) => {
  const validIds = ids.filter((id) => !ObjectId.isValid(id));
  const authorsIds = validIds.map((id) => ObjectId.createFromHexString(id));
  const authors = await AuthorsCollection.find({ _id: { $in: authorsIds } })
    .project({ _id: 1 })
    .toArray();
  return authors;
};
