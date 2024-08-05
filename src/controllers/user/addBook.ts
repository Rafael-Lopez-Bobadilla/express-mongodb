import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { addBook as addBookService } from "../../collections/User/services/addBook";
import CustomError from "../../utils/CustomError";
import { omit } from "lodash";
import { checkBookId } from "../../collections/Book/services/checkBookId";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await checkBookId(bookId);
    if (!book) throw new CustomError("no book", 400);
    const userId = verifyJwt(req);
    const user = await addBookService(userId, book._id);
    if (!user) throw new CustomError("no user", 400);
    res.status(200).json(omit(user, ["_id", "password"]));
  } catch (err) {
    next(err);
  }
};

export default addBook;
