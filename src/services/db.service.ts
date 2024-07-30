import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

const mongoDbUrl = process.env.MONGODB_URL!;
const client = new MongoClient(mongoDbUrl, {
  minPoolSize: 5,
});

const dbName = process.env.MONGODB_DBNAME!;

(async () => {
  await client.connect();
})();

const db: Db = client.db(dbName);

export default db;
