import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { addBook as addBookService } from "../../collections/User/services/addBook";
import CustomError from "../../utils/CustomError";
import { checkBookId } from "../../collections/Book/services/checkBookId";
import sendUser from "../../utils/sendUser";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await checkBookId(bookId);
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
