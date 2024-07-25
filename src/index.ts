import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { mongoClient } from "./db";
const port = process.env.PORT || "";

const main = async () => {
  try {
    await mongoClient.connect();
    console.log("db connected");
    app.listen(port, () => console.log("server listening"));
  } catch (err) {
    console.log(err);
  }
};

//A user has books - need to populate books
//A book have reviews - needs to populate reviews a book has an average raiting
//review is from a user - needs only the name {user: {name,idref}}

main();
