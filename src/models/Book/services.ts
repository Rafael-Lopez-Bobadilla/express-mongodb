import { ClientSession, ObjectId } from "mongodb";
import { IBook, BookCollection } from "./model";
import CustomError from "../../utils/CustomError";

const bookService = {
  createBook: async (newBook: IBook) => {
    const result = await BookCollection.insertOne(newBook);
    return result.insertedId;
  },
  getBookById: async (id: string) => {
    const bookId = ObjectId.createFromHexString(id);
    const book = await BookCollection.findOne({ _id: bookId });
    if (!book) throw new CustomError("no book", 400);
    return book;
  },
  updateBookRaiting: async (
    bookId: ObjectId,
    newRaiting: number,
    session: ClientSession
  ) => {
    const result = await BookCollection.updateOne(
      { _id: bookId },
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
