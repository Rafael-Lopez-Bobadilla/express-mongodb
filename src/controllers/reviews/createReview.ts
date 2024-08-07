import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { reviewSchema } from "../../zodSchemas/reviewSchemas";
import { createReview as createReviewService } from "../../collections/Reviews/services/createReview";
import { mongoClient } from "../../db";
import { getBookById } from "../../collections/Books/services/getBookById";
import { updateBookRaiting } from "../../collections/Books/services/updateBookRaiting";
import { getUserById } from "../../collections/Users/services/getUserById";
import CustomError from "../../utils/CustomError";
import { ObjectId } from "mongodb";
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
    const newRaiting =
      (book.raiting * book.reviews + validData.raiting) / (book.reviews + 1);
    const newReview = {
      ...validData,
      bookId: book._id,
      user: { name: user.name, id: user._id },
      createdAt: new Date(Date.now()),
    };
    session.startTransaction();
    await createReviewService(newReview, session);
    await updateBookRaiting(newReview.bookId, newRaiting, session);
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
