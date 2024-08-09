import { ObjectId } from "mongodb";
import { UserCollection } from "../collection";
import { BOOKS_COLLECTION } from "../../Books/collection";
import { IUserWithBooks } from "../collection";
export const getUserWithBooks = async (id: ObjectId) => {
  const user = await UserCollection.aggregate<IUserWithBooks>([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: BOOKS_COLLECTION,
        localField: "books",
        foreignField: "_id",
        as: "books",
      },
    },
  ]).toArray();
  return user[0];
};
