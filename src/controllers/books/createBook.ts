import { NextFunction, Request, Response } from "express";
import { bookSchema } from "./schemas";
import bookService from "../../models/Book/services";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = bookSchema.parse(req.body);
    const newBook = { ...validData, reviews: 0, raiting: 0 };
    await bookService.createBook(newBook);
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
};

export default createBook;
