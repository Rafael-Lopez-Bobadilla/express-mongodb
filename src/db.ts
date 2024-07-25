import { MongoClient, ServerApiVersion } from "mongodb";
const mongoUri = process.env.MONGO_URI || "";
export const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("MongoOfficialDriver");
