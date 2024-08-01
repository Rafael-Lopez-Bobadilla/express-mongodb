import { Router } from "express";
import addBook from "../controllers/user/addBook";
const userRouter = Router();

userRouter.patch("/addBook/:bookId", addBook);

export default userRouter;
