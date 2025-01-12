import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

// 初始化缓存
const globalMongoose = global.mongoose ?? {
  conn: null,
  promise: null,
};

global.mongoose = globalMongoose;

async function connectDB() {
  // 如果已经有连接，直接返回
  if (globalMongoose.conn) {
    return globalMongoose.conn;
  }

  // 如果没有正在进行的连接尝试，创建新的连接
  if (!globalMongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalMongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    // 等待连接完成
    const mongooseInstance = await globalMongoose.promise;
    globalMongoose.conn = mongooseInstance;
  } catch (e) {
    globalMongoose.promise = null;
    throw e;
  }

  return globalMongoose.conn;
}

export default connectDB; 