import { Router } from "express";
import createBook from "../controllers/books/createBook";
import getBookWithReviews from "../controllers/books/getBookWithReviews";
import getBooks from "../controllers/books/getBooks";
const booksRouter = Router();

booksRouter.post("", createBook);
booksRouter.get("/:bookId", getBookWithReviews);
booksRouter.get("", getBooks);
export default booksRouter;
