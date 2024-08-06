import { Router } from "express";
import addBook from "../controllers/user/addBook";
const userRouter = Router();

userRouter.patch("/books", addBook);

export default userRouter;
