import { Router } from "express";
import createReview from "../controllers/reviews/createReview";
import updateReview from "../controllers/reviews/updateReview";
import getReviews from "../controllers/reviews/getReviews";
const reviewsRouter = Router();

reviewsRouter.post("", createReview);
reviewsRouter.patch("/:reviewId", updateReview);
reviewsRouter.get("", getReviews);
export default reviewsRouter;
