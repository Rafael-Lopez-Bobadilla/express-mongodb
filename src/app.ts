import express from "express";
import helmet from "helmet";
import cors from "cors";
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
export default app;