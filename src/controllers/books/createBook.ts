import { NextFunction, Request, Response } from "express";
import { bookSchema } from "../../zodSchemas/bookSchemas";
import { createBook as createBookService } from "../../collections/Book/services/createBook";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = bookSchema.parse(req.body);
    const newBook = { ...validData, reviews: 0, raiting: 0 };
    await createBookService(newBook);
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
};

export default createBook;
