import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { reviewSchema } from "../../zodSchemas/reviewSchemas";
import { createReview as createReviewService } from "../../collections/Reviews/services/createReview";
import { mongoClient } from "../../db";
import { getBookById } from "../../collections/Books/services/getBookById";
import { updateBookRating } from "../../collections/Books/services/updateBookRating";
import { getUserById } from "../../collections/Users/services/getUserById";
import CustomError from "../../utils/CustomError";
import { MongoError, ObjectId } from "mongodb";
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = mongoClient.startSession();
  try {
    const id = verifyJwt(req);
    const validData = reviewSchema.parse(req.body);
    if (!ObjectId.isValid(validData.bookId))
      throw new CustomError("Invalid book id", 400);
    const bookId = ObjectId.createFromHexString(validData.bookId);
    const userId = ObjectId.createFromHexString(id);
    const [user, book] = await Promise.all([
      getUserById(userId),
      getBookById(bookId),
    ]);
    if (!user || !book) throw new CustomError("no user or book", 400);
    const newRating =
      (book.rating * book.reviews + validData.rating) / (book.reviews + 1);
    const newReview = {
      ...validData,
      bookId: book._id,
      user: { name: user.name, id: user._id },
      createdAt: new Date(Date.now()),
    };
    session.startTransaction();
    await createReviewService(newReview, session);
    await updateBookRating(newReview.bookId, newRating, session);
    await session.commitTransaction();
    res.status(201).json(newReview);
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    if (err instanceof MongoError && err.code === 11000)
      return next(new CustomError("repeted review", 400));
    next(err);
  } finally {
    session.endSession();
  }
};

export default createReview;
