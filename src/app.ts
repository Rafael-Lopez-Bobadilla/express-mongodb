import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import handleError from "./middlewares/handleError";
import booksRouter from "./routes/booksRouter";
import reviewsRouter from "./routes/reviewsRouter";
import userRouter from "./routes/userRouter";
import authorsRouter from "./routes/authorRouter";

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
app.use("/users", userRouter);
app.use("/authors", authorsRouter);
app.use(handleError);
export default app;
