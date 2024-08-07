import { ObjectId } from "mongodb";
import { BookCollection } from "../collection";
import { TQueryParams } from "../../../zodSchemas/bookSchemas";
export const getBooks = async (queryParams: TQueryParams) => {
  const { author } = queryParams;
  if (author && !ObjectId.isValid(author)) return null;
  const books = await BookCollection.find({
    ...queryParams,
    authors: author
      ? { $elemMatch: ObjectId.createFromHexString(author) }
      : undefined,
  })
    .limit(10)
    .toArray();
  return books;
};
