import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { client } from "./db";
const port = process.env.PORT || "";

const main = async () => {
  try {
    await client.connect();
    console.log("db connected");
    app.listen(port, () => console.log("server listening"));
  } catch (err) {
    console.log(err);
  }
};

main();
