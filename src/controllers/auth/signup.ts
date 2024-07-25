import { Request, Response } from "express";
import { createUser } from "../../models/User/services";
import { signupSchema } from "../../models/User/model";
import { omit } from "lodash";
import bcrypt from "bcrypt";
const signup = async (req: Request, res: Response) => {
  try {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) throw new Error("bad request");
    const encrypted = await bcrypt.hash(parseResult.data.password, 12);
    const newUser = { ...parseResult.data, password: encrypted };
    await createUser(newUser);
    res.status(201).json(omit(newUser, ["_id", "password"]));
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

export default signup;
