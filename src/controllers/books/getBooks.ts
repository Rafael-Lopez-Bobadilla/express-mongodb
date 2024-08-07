import { NextFunction, Request, Response } from "express";
import { queryParamsSchema } from "../../zodSchemas/bookSchemas";
import { getBooks as getBooksService } from "../../collections/Books/services/getBooks";
import CustomError from "../../utils/CustomError";

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = queryParamsSchema.parse(req.query);
    const books = await getBooksService(validData);
    if (books === null) throw new CustomError("invalid author", 400);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export default getBooks;
