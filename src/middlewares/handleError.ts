import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import { ZodError } from "zod";

const handleError = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError)
    return res.status(err.status).json(err.message);
  if (err instanceof ZodError) return res.status(400).json("Invalid data");
  res.status(500).json("Server Error");
};

export default handleError;
