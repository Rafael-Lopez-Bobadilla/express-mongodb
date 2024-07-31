import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { z } from "zod";
import userSevice from "../../models/User/services";
import CustomError from "../../utils/CustomError";
import { omit } from "lodash";
const bookIdSchema = z.object({ bookId: z.string() });
const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = verifyJwt(req);
    const { bookId } = bookIdSchema.parse(req.body);
    const user = await userSevice.addBook(userId, bookId);
    if (!user) return next(new CustomError("no user", 400));
    res.status(200).json(omit(user, ["_id", "password"]));
  } catch (err) {
    next(err);
  }
};

export default addBook;
