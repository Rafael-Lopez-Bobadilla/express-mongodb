import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { getUserById } from "../../models/User/services";
import CustomError from "../../utils/CustomError";
import sendUser from "../../utils/sendUser";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = verifyJwt(req);
    const user = await getUserById(id);
    if (!user) throw new CustomError("No user", 401);
    sendUser(id, res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default authenticate;
