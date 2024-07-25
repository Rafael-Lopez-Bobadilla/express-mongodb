import { db } from "../../db";
import { TUser } from "./model";

const User = db.collection<TUser>("user");
export const createUser = async (newUser: TUser) => {
  const result = await User.insertOne(newUser);
  return result.insertedId;
};
