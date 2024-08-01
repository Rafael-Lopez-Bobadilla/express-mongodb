import { ObjectId } from "mongodb";
import { db } from "../../db";
export interface IUser {
  name: string;
  email: string;
  age: number;
  password: string;
  books: ObjectId[];
}
export const UserCollection = db.collection<IUser>("user");
