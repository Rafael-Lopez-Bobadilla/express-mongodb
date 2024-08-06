import { Router } from "express";
import createAuthor from "../controllers/authors/createAuthor";

const authorsRouter = Router();

authorsRouter.post("", createAuthor);

export default authorsRouter;
