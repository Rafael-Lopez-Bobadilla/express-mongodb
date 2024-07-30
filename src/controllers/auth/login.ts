import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../models/User/model";
import userService from "../../models/User/services";
import CustomError from "../../utils/CustomError";
import bcrypt from "bcrypt";
import sendUser from "../../utils/sendUser";
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginData = loginSchema.parse(req.body);
    const user = await userService.getUserByEmail(loginData.email);
    const correct = await bcrypt.compare(loginData.password, user.password);
    if (!correct) return next(new CustomError("password", 401));
    sendUser(user._id, res, 200, user);
  } catch (err) {
    next(err);
  }
};

export default login;
