import { Response } from "express";
import { omit } from "lodash";
import { IUser, IUserWithBooks } from "../collections/User/collection";
const sendUser = (
  res: Response,
  status: number,
  user: IUser | IUserWithBooks
) => {
  res.status(status).json(omit(user, ["_id", "password"]));
};

export default sendUser;
