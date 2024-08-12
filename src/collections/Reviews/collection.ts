import { ObjectId } from "mongodb";
import { db } from "../../db";
interface IReviewer {
  name: string;
  id: ObjectId;
}
export interface IReview {
  text: string;
  rating: number;
  createdAt: Date;
  bookId: ObjectId;
  user: IReviewer;
}

const REVIEWS_COLLECTION = "reviews";

export const ReviewCollection = db.collection<IReview>(REVIEWS_COLLECTION);
