import { NextFunction, Request, Response } from "express";
import userService from "../../models/User/services";
import CustomError from "../../utils/CustomError";
import bcrypt from "bcrypt";
import sendUser from "../../utils/sendUser";
import { loginSchema } from "./schemas";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginData = loginSchema.parse(req.body);
    const user = await userService.getUserByEmail(loginData.email);
    if (!user) return next(new CustomError("no user", 400));
    const correct = await bcrypt.compare(loginData.password, user.password);
    if (!correct) return next(new CustomError("password", 401));
    sendUser(user._id, res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default login;