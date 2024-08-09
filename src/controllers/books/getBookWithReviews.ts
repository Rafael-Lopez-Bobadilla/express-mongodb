import { NextFunction, Request, Response } from "express";
import { getBookById } from "../../collections/Books/services/getBookById";
import { getBookReviews } from "../../collections/Reviews/services/getBookReviews";
import CustomError from "../../utils/CustomError";
import { ObjectId } from "mongodb";
const getBookWithReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idString = req.params.bookId;
    const validId = ObjectId.createFromHexString(idString);
    const [book, reviews] = await Promise.all([
      getBookById(validId),
      getBookReviews(validId, 2),
    ]);
    if (!book || !reviews) throw new CustomError("invalid book id", 400);
    res.status(200).json({ book, reviews });
  } catch (err) {
    next(err);
  }
};

export default getBookWithReviews;
