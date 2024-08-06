import { NextFunction, Request, Response } from "express";
import { getBookReviews } from "../../collections/Reviews/services/getBookReviews";
import { getReviewsSchema } from "../../zodSchemas/reviewSchemas";
import CustomError from "../../utils/CustomError";

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = getReviewsSchema.parse(req.query);
    const raiting = Number(validData.raiting) || undefined;
    const reviews = await getBookReviews(validData.bookId, 10, raiting);
    if (reviews === null) throw new CustomError("invalid book id", 400);
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

export default getReviews;
