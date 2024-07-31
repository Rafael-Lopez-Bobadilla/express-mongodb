import { Router } from "express";
import addBook from "../controllers/user/addBook";
const userRouter = Router();

userRouter.post("/addBook", addBook);

export default userRouter;
