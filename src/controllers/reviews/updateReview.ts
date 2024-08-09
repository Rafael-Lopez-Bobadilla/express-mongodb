import { Request, Response, NextFunction } from "express";
import { updateReviewSchema } from "../../zodSchemas/reviewSchemas";
import { updateReview as updateService } from "../../collections/Reviews/services/updateReview";
import verifyJwt from "../../utils/verifyJwt";
import CustomError from "../../utils/CustomError";
import { ObjectId } from "mongodb";
const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdString = verifyJwt(req);
    const reviewIdString = req.params.reviewId;
    const reviewId = ObjectId.createFromHexString(reviewIdString);
    const userId = ObjectId.createFromHexString(userIdString);
    const validData = updateReviewSchema.parse(req.body);
    const review = await updateService(userId, reviewId, validData.text);
    if (!review) throw new CustomError("invalid user or review", 400);
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

export default updateReview;
