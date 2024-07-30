import { ObjectId } from "mongodb";
import { db } from "../../db";
import { TUser } from "./model";
import CustomError from "../../utils/CustomError";

const User = db.collection<TUser>("user");

const userSevice = {
  createUser: async (newUser: TUser) => {
    const result = await User.insertOne(newUser);
    return result.insertedId;
  },

  getUserById: async (id: ObjectId) => {
    const user = await User.findOne({ _id: id });
    if (!user) throw new CustomError("no user", 400);
    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("no user", 400);
    return user;
  },
};

export default userSevice;
