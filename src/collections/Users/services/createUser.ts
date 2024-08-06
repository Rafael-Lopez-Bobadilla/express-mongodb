import { UserCollection, IUser } from "../collection";
export const createUser = async (newUser: IUser) => {
  const result = await UserCollection.insertOne(newUser);
  return result.insertedId;
};
