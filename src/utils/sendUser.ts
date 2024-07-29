import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import getCookieOptions from "./cookieOptions";
import { Response } from "express";
import { TUser } from "../models/User/model";
import { omit } from "lodash";
import config from "../config";
const sendUser = async (
  id: ObjectId,
  res: Response,
  status: 200 | 201,
  user: TUser
) => {
  const token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: 60 * 60 * config.jwtExp, // seconds
  });
  const options = getCookieOptions({ logout: false });
  res.cookie(config.jwtName, token, options);
  res.status(status).json(omit(user, ["_id", "password"]));
};

export default sendUser;
