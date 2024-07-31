import { db } from "../../db";
export interface IBook {
  name: string;
  reviews: number;
  raiting: number;
}

export const BookCollection = db.collection<IBook>("book");
