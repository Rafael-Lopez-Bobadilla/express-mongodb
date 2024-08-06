import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { addBook as addBookService } from "../../collections/Users/services/addBook";
import CustomError from "../../utils/CustomError";
import { checkBookId } from "../../collections/Books/services/checkBookId";
import sendUser from "../../utils/sendUser";
import { addBookSchema } from "../../zodSchemas/userSchemas";
const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = addBookSchema.parse(req.body);
    const book = await checkBookId(validData.bookId);
    if (!book) throw new CustomError("no book", 400);
    const userId = verifyJwt(req);
    const user = await addBookService(userId, book._id);
    if (!user) throw new CustomError("no user", 400);
    sendUser(res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default addBook;
