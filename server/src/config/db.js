import mongoose from 'mongoose';

let memoryServerInstance = null;

/**
 * Connect to MongoDB database
 * -------------------------------------------------------------
 * 1. If process.env.MONGO_URI is set (e.g. MongoDB Atlas or local mongod),
 *    connects directly to it.
 * 2. If MONGO_URI is omitted or connecting locally fails, gracefully starts
 *    an in-memory MongoDB instance for seamless development & testing.
 */
export const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  if (uri && uri.trim() !== '') {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[DB] Failed to connect to specified MONGO_URI (${err.message}).`);
      console.log('[DB] Falling back to in-memory development database...');
    }
  }

  // Fallback: Start in-memory MongoDB
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServerInstance = await MongoMemoryServer.create();
    uri = memoryServerInstance.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[DB] In-Memory MongoDB Connected at: ${uri}`);
    return conn;
  } catch (err) {
    console.error(`[DB] Critical: Failed to start MongoDB connection: ${err.message}`);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB database (for graceful shutdowns)
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServerInstance) {
      await memoryServerInstance.stop();
    }
    console.log('[DB] MongoDB Disconnected cleanly.');
  } catch (err) {
    console.error(`[DB] Error during disconnect: ${err.message}`);
  }
};
