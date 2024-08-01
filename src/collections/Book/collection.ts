import { db } from "../../db";
export interface IBook {
  name: string;
  reviews: number;
  raiting: number;
}

export const BOOKS_COLLECTION = "books";

export const BookCollection = db.collection<IBook>(BOOKS_COLLECTION);
