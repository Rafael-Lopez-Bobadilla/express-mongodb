import { Filter, FindOptions, ObjectId } from "mongodb";
import { BookCollection, IBook } from "../collection";
import { TQueryParams } from "../../../zodSchemas/bookSchemas";

export const getBooks = async (
  queryParams: TQueryParams,
  options: FindOptions = {}
) => {
  const { author } = queryParams;
  let query: Filter<IBook> = queryParams;
  delete query.author;
  if (author) {
    query = {
      ...query,
      authors: { $in: [ObjectId.createFromHexString(author)] },
    };
  }
  if (!options.limit) options = { ...options, limit: 10 };
  const books = await BookCollection.find(query, options).toArray();
  return books;
};
