import { Request, Response, NextFunction } from "express";
import { updateReviewSchema } from "../../zodSchemas/reviewSchemas";
import { updateReview as updateService } from "../../collections/Reviews/services/updateReview";
import verifyJwt from "../../utils/verifyJwt";
import CustomError from "../../utils/CustomError";
const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyJwt(req);
    const reviewId = req.params.reviewId;
    const validData = updateReviewSchema.parse(req.body);
    const review = await updateService(reviewId, validData.text);
    if (!review) throw new CustomError("no review", 400);
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

export default updateReview;
