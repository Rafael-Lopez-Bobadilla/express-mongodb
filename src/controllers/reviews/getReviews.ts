import { NextFunction, Request, Response } from "express";
import { getBookReviews } from "../../collections/Reviews/services/getBookReviews";
import { queryParamsSchema } from "../../zodSchemas/reviewSchemas";
import { ObjectId } from "mongodb";

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryParams = queryParamsSchema.parse(req.query);
    const bookId = ObjectId.createFromHexString(queryParams.bookId);
    const query = { ...queryParams, bookId };
    const reviews = await getBookReviews(query, 10);
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

export default getReviews;
