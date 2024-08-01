import { Router } from "express";
import signup from "../controllers/auth/signup";
import logout from "../controllers/auth/logout";
import authenticate from "../controllers/auth/authenticate";
import login from "../controllers/auth/login";
const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);
authRouter.get("/authenticate", authenticate);

export default authRouter;
