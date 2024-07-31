import { ObjectId } from "mongodb";
import { IUser, UserCollection } from "./model";
import { IBook } from "../Book/model";

interface IUserWithBooks extends IBook {
  books: IBook[];
}
const userSevice = {
  createUser: async (newUser: IUser) => {
    const result = await UserCollection.insertOne(newUser);
    return result.insertedId;
  },

  getUserById: async (id: string) => {
    const userId = ObjectId.createFromHexString(id);
    const user = await UserCollection.findOne({ _id: userId });
    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await UserCollection.findOne({ email });
    return user;
  },
  addBook: async (userId: string, bookId: string) => {
    const validBookId = ObjectId.createFromHexString(bookId);
    const validUserId = ObjectId.createFromHexString(userId);
    const user = await UserCollection.findOneAndUpdate(
      { _id: validUserId },
      { $push: { books: validBookId } },
      { returnDocument: "after" }
    );
    return user;
  },
  getUserWithBooks: async (id: string) => {
    const userId = ObjectId.createFromHexString(id);
    const user = await UserCollection.aggregate<IUserWithBooks>([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "book",
          localField: "books",
          foreignField: "_id",
          as: "books",
        },
      },
    ]).toArray();
    return user;
  },
};

export default userSevice;
