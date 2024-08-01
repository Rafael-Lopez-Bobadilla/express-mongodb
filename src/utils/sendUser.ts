import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import getCookieOptions from "./cookieOptions";
import { Response } from "express";
import { IUser } from "../collections/User/collection";
import { omit } from "lodash";
import config from "../config";
const sendUser = async (
  id: ObjectId,
  res: Response,
  status: 200 | 201,
  user: IUser
) => {
  const token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: 60 * 60 * config.jwtExp, // seconds
  });
  const options = getCookieOptions({ logout: false });
  res.cookie(config.jwtName, token, options);
  res.status(status).json(omit(user, ["_id", "password"]));
};

export default sendUser;
