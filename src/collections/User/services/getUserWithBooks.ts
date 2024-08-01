import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
import { IBook } from "../../Book/collection";
interface IUserWithBooks extends IBook {
  books: IBook[];
}
export const getUserWithBooks = async (id: string) => {
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
};
