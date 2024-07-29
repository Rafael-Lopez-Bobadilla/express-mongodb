import { ObjectId } from "mongodb";
import { db } from "../../db";
import { TUser } from "./model";

const User = db.collection<TUser>("user");
export const createUser = async (newUser: TUser) => {
  const result = await User.insertOne(newUser);
  return result.insertedId;
};

export const getUserById = async (id: ObjectId) => {
  return await User.findOne({ _id: id });
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
