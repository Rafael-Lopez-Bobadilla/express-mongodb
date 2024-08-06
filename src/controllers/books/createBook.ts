import { NextFunction, Request, Response } from "express";
import { bookSchema } from "../../zodSchemas/bookSchemas";
import { createBook as createBookService } from "../../collections/Books/services/createBook";
import { checkIds } from "../../collections/Authors/services/checkId";
import CustomError from "../../utils/CustomError";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = bookSchema.parse(req.body);
    const authors = await checkIds(validData.authors);
    if (!authors) throw new CustomError("no authors", 400);
    const authorsIds = authors.map((author) => author._id);
    const newBook = {
      ...validData,
      reviews: 0,
      raiting: 0,
      authors: authorsIds,
    };
    await createBookService(newBook);
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
};

export default createBook;
