import { NextFunction, Request, Response } from "express";
import verifyJwt from "../../utils/verifyJwt";
import { getUserWithBooks } from "../../collections/Users/services/getUserWithBooks";
import CustomError from "../../utils/CustomError";
import sendUser from "../../utils/sendUser";
import getNewToken from "./utils/getNewToken";
import getCookieOptions from "./utils/cookieOptions";
import config from "../../config";
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = verifyJwt(req);
    const user = await getUserWithBooks(id);
    if (!user) throw new CustomError("no user", 401);
    const token = getNewToken(user._id);
    const options = getCookieOptions({ logout: false });
    res.cookie(config.jwtName, token, options);
    sendUser(res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default authenticate;
