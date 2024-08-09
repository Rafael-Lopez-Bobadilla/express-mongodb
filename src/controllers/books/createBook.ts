import { NextFunction, Request, Response } from "express";
import { bookSchema } from "../../zodSchemas/bookSchemas";
import { createBook as createBookService } from "../../collections/Books/services/createBook";
import { checkIds } from "../../collections/Authors/services/checkIds";
import CustomError from "../../utils/CustomError";
import { ObjectId } from "mongodb";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = bookSchema.parse(req.body);
    const ids = validData.authors;
    const validStrings = ids.filter((id) => ObjectId.isValid(id));
    if (validStrings.length !== ids.length)
      throw new CustomError("invalid author id", 400);
    const validIds = validStrings.map((id) => ObjectId.createFromHexString(id));
    const authorsIds = await checkIds(validIds);
    if (authorsIds.length !== validIds.length)
      throw new CustomError("invalid author id", 400);
    const newBook = {
      ...validData,
      reviews: 0,
      raiting: 0,
      authors: authorsIds,
    };
    await createBookService(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

export default createBook;
