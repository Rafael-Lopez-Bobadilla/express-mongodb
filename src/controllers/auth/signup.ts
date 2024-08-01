import { NextFunction, Request, Response } from "express";
import { createUser } from "../../collections/User/services/createUser";
import { signupSchema } from "../../zodSchemas/userSchemas";
import bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import CustomError from "../../utils/CustomError";
import sendUser from "../../utils/sendUser";
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = signupSchema.parse(req.body);
    const encrypted = await bcrypt.hash(validData.password, 12);
    const newUser = { ...validData, password: encrypted, books: [] };
    const id = await createUser(newUser);
    sendUser(id, res, 201, newUser);
  } catch (err) {
    if (err instanceof MongoError && err.code === 11000)
      return next(new CustomError("Repeted email", 400));
    next(err);
  }
};

export default signup;
