import { Db, MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'myPortfolio';

interface MongoCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  var mongoCache: MongoCache | undefined;
}

const cached: MongoCache = globalThis.mongoCache ?? { client: null, promise: null };

if (!globalThis.mongoCache) {
  globalThis.mongoCache = cached;
}

export async function connectDB(): Promise<Db> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  if (!cached.promise) {
    cached.promise = new MongoClient(MONGODB_URI).connect();
  }

  cached.client = await cached.promise;
  return cached.client.db(MONGODB_DB_NAME);
}
