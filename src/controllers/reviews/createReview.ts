import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { newReviewSchema } from "../../models/Review/model";
import reviewService from "../../models/Review/services";
import { mongoClient } from "../../db";
import bookService from "../../models/Book/services";
import userSevice from "../../models/User/services";
import { ObjectId } from "mongodb";
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = mongoClient.startSession();
  try {
    const id = verifyJwt(req);
    const validData = newReviewSchema.parse(req.body);
    const bookId = ObjectId.createFromHexString(validData.bookId);
    const user = await userSevice.getUserById(id);
    const book = await bookService.getBookById(bookId);
    const newRaiting =
      (book.raiting * book.reviews + validData.raiting) / (book.reviews + 1);
    const newReview = {
      ...validData,
      bookId,
      user: { name: user.name, id },
      createdAt: new Date(Date.now()),
    };
    session.startTransaction();
    await reviewService.createReview(newReview, session);
    await bookService.updateBookRaiting(newReview.bookId, newRaiting, session);
    await session.commitTransaction();
    res.status(201).json(newReview);
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export default createReview;
