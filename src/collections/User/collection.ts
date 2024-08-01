import { ObjectId } from "mongodb";
import { db } from "../../db";
export interface IUser {
  name: string;
  email: string;
  age: number;
  password: string;
  books: ObjectId[];
}

const USERS_COLLECTION = "users";
export const UserCollection = db.collection<IUser>(USERS_COLLECTION);