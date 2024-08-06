import { ObjectId } from "mongodb";
import { db } from "../../db";
import { IBook } from "../Books/collection";
export interface IUser {
  name: string;
  email: string;
  age: number;
  password: string;
  books: ObjectId[];
}

export interface IUserWithBooks extends Omit<IUser, "books"> {
  _id: ObjectId;
  books: IBook[];
}

const USERS_COLLECTION = "users";
export const UserCollection = db.collection<IUser>(USERS_COLLECTION);
