import { NextFunction, Request, Response } from "express";
import { authorSchema } from "../../zodSchemas/authorSchemas";
import { createAuthor as createService } from "../../collections/Authors/services/createAuthor";
const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validData = authorSchema.parse(req.body);
    await createService(validData);
    res.status(201).json({ author: validData });
  } catch (err) {
    next(err);
  }
};

export default createAuthor;
