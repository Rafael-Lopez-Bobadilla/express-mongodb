import { ObjectId } from "mongodb";
import { db } from "../../db";
export interface IBook {
  name: string;
  reviews: number;
  rating: number;
  authors: ObjectId[];
  category: string;
}

export const BOOKS_COLLECTION = "books";

export const BookCollection = db.collection<IBook>(BOOKS_COLLECTION);
