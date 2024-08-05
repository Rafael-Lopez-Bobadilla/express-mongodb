import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { getUserWithBooks } from "../../collections/User/services/getUserWithBooks";
import CustomError from "../../utils/CustomError";
import { omit } from "lodash";
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = verifyJwt(req);
    const user = await getUserWithBooks(id);
    if (!user) throw new CustomError("no user", 401);
    res.status(200).json(omit(user, ["_id", "password"]));
  } catch (err) {
    next(err);
  }
};

export default authenticate;
