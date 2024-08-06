import { Router } from "express";
import createBook from "../controllers/books/createBook";
import getBookWithReviews from "../controllers/books/getBookWithReviews";
const booksRouter = Router();

booksRouter.post("", createBook);
booksRouter.get("/:bookId", getBookWithReviews);
export default booksRouter;
