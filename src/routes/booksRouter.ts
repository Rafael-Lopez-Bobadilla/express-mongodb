import { Router } from "express";
import createBook from "../controllers/books/createBook";
const booksRouter = Router();

booksRouter.post("/createBook", createBook);
export default booksRouter;
