import { Router } from "express";
import createReview from "../controllers/reviews/createReview";
const reviewsRouter = Router();

reviewsRouter.post("/createReview", createReview);
export default reviewsRouter;
