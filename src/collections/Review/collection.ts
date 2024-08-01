import { ObjectId } from "mongodb";
import { db } from "../../db";
interface IReviewer {
  name: string;
  id: ObjectId;
}
export interface IReview {
  text: string;
  raiting: number;
  createdAt: Date;
  bookId: ObjectId;
  user: IReviewer;
}

export const ReviewCollection = db.collection<IReview>("review");
