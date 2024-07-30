import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import userService from "../../models/User/services";
import sendUser from "../../utils/sendUser";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = verifyJwt(req);
    const user = await userService.getUserById(id);
    sendUser(id, res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default authenticate;
