import express from "express";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/authRouter";
import handleError from "./middlewares/handleError";
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/auth", authRouter);
app.use(handleError);
export default app;
