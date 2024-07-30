import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./app";
import { mongoClient } from "./db";

const main = async () => {
  try {
    Object.entries(config).forEach(([key, value]) => {
      if (value === "") throw new Error(`Need to set ${key}`);
    });
    await mongoClient.connect();
    console.log("db connected");
    app.listen(config.PORT, () => console.log("server listening"));
  } catch (err) {
    console.log(err);
  }
};

main();
