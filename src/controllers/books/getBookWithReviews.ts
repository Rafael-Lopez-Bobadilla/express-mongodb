import { NextFunction, Request, Response } from "express";
import { getBookById } from "../../collections/Books/services/getBookById";
import { getBookReviews } from "../../collections/Reviews/services/getBookReviews";
import CustomError from "../../utils/CustomError";
const getBookWithReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const [book, reviews] = await Promise.all([
      getBookById(bookId),
      getBookReviews(bookId, 2),
    ]);
    if (!book || reviews === null) throw new CustomError("no book", 400);
    res.status(200).json({ book, reviews });
  } catch (err) {
    next(err);
  }
};

export default getBookWithReviews;
