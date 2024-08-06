import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../collections/User/services/getUserByEmail";
import CustomError from "../../utils/CustomError";
import bcrypt from "bcrypt";
import sendUser from "../../utils/sendUser";
import { loginSchema } from "../../zodSchemas/userSchemas";
import getNewToken from "./utils/getNewToken";
import getCookieOptions from "./utils/cookieOptions";
import config from "../../config";
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginData = loginSchema.parse(req.body);
    const user = await getUserByEmail(loginData.email);
    if (!user) throw new CustomError("no user", 400);
    const correct = await bcrypt.compare(loginData.password, user.password);
    if (!correct) throw new CustomError("password", 401);
    const token = getNewToken(user._id);
    const options = getCookieOptions({ logout: false });
    res.cookie(config.jwtName, token, options);
    sendUser(res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default login;
