import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import handleError from "./middlewares/handleError";
import booksRouter from "./routes/booksRouter";
import reviewsRouter from "./routes/reviewsRouter";

const app = express();
app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/reviews", reviewsRouter);
app.use(handleError);
export default app;
