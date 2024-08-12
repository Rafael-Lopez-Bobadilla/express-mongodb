import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { addBook as addBookService } from "../../collections/Users/services/addBook";
import CustomError from "../../utils/CustomError";
import { checkBookId } from "../../collections/Books/services/checkBookId";
import sendUser from "../../utils/sendUser";
import { addBookSchema } from "../../zodSchemas/userSchemas";
import { ObjectId } from "mongodb";
const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = addBookSchema.parse(req.body);
    if (!ObjectId.isValid(validData.bookId))
      throw new CustomError("Invalid book id", 400);
    const bookId = ObjectId.createFromHexString(validData.bookId);
    const book = await checkBookId(bookId);
    if (book.length === 0) throw new CustomError("invalid book id", 400);
    const idString = verifyJwt(req);
    const userId = ObjectId.createFromHexString(idString);
    const user = await addBookService(userId, bookId);
    if (!user) throw new CustomError("no user", 400);
    sendUser(res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default addBook;
