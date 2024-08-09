import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
export const getUserById = async (id: ObjectId) => {
  const user = await UserCollection.findOne({ _id: id });
  return user;
};
