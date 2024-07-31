import { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import CustomError from "./CustomError";
const verifyJwt = (req: Request) => {
  const token = req.cookies[config.jwtName];
  if (!token) throw new CustomError("No token", 401);
  const decoded = jwt.verify(token, config.jwtSecret);
  if (typeof decoded !== "string" && typeof decoded.id === "string")
    return decoded.id;
  throw new CustomError("Invalid token", 401);
};

export default verifyJwt;
