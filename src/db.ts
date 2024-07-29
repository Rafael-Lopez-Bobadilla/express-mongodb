import { MongoClient, ServerApiVersion } from "mongodb";
import config from "./config";
export const mongoClient = new MongoClient(config.mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = mongoClient.db("MongoOfficialDriver");
