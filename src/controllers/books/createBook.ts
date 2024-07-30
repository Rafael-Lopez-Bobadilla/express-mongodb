import { NextFunction, Request, Response } from "express";
import { newBookSchema } from "../../models/Book/model";
import bookService from "../../models/Book/services";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = newBookSchema.parse(req.body);
    const newBook = { ...validData, reviews: 0, raiting: 0 };
    await bookService.createBook(newBook);
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
};

export default createBook;
