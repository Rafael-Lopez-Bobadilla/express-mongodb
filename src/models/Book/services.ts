import { ClientSession, ObjectId } from "mongodb";
import { db } from "../../db";
import { TBook } from "./model";
import CustomError from "../../utils/CustomError";

const Book = db.collection<TBook>("book");

const bookService = {
  createBook: async (newBook: TBook) => {
    const result = await Book.insertOne(newBook);
    return result.insertedId;
  },
  getBookById: async (id: ObjectId) => {
    const book = await Book.findOne({ _id: id });
    if (!book) throw new CustomError("no book", 400);
    return book;
  },
  updateBookRaiting: async (
    id: ObjectId,
    newRaiting: number,
    session: ClientSession
  ) => {
    const result = await Book.updateOne(
      { _id: id },
      {
        $inc: { reviews: 1 },
        $set: { raiting: newRaiting },
      },
      { session }
    );
    return result;
  },
};

export default bookService;
