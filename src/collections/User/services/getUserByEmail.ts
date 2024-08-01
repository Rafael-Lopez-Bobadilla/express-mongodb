import { UserCollection } from "../collection";
export const getUserByEmail = async (email: string) => {
  const user = await UserCollection.findOne({ email });
  return user;
};
