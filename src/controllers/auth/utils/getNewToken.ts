import jwt from "jsonwebtoken";
import config from "../../../config";
import { ObjectId } from "mongodb";
const getNewToken = (id: ObjectId) => {
  const token = jwt.sign({ id }, config.jwtSecret, {
    expiresIn: 60 * 60 * config.jwtExp, // seconds
  });
  return token;
};

export default getNewToken;
