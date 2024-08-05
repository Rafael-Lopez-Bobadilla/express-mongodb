import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
export const getUserById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const userId = ObjectId.createFromHexString(id);
  const user = await UserCollection.findOne({ _id: userId });
  return user;
};
