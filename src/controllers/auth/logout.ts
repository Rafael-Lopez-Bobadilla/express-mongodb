import { NextFunction, Request, Response } from "express";
import getCookieOptions from "./utils/cookieOptions";
import config from "../../config";
import verifyJwt from "../../utils/verifyJwt";
const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyJwt(req);
    res.cookie(config.jwtName, "null", getCookieOptions({ logout: true }));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default logout;
