import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { reviewSchema } from "../../zodSchemas/reviewSchemas";
import reviewService from "../../models/Review/services";
import { mongoClient } from "../../db";
import bookService from "../../models/Book/services";
import userSevice from "../../models/User/services";
import CustomError from "../../utils/CustomError";
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = mongoClient.startSession();
  try {
    const id = verifyJwt(req);
    const validData = reviewSchema.parse(req.body);
    const user = await userSevice.getUserById(id);
    const book = await bookService.getBookById(validData.bookId);
    if (!user || !book) throw new CustomError("no user or book", 400);
    const newRaiting =
      (book.raiting * book.reviews + validData.raiting) / (book.reviews + 1);
    const newReview = {
      ...validData,
      bookId: book._id,
      user: { name: user.name, id: user._id },
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
