import { db } from "../../db";
export interface IAuthor {
  name: string;
  age: number;
}

const AUTHORS_COLLECTION = "authors";
export const AuthorsCollection = db.collection<IAuthor>(AUTHORS_COLLECTION);
