require("dotenv").config();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer = null;

const isTest = process.env.NODE_ENV === "test";

const connectDatabase = async () => {
  if (isTest) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    const check = await mongoose.connect(mongoUri, {});
  } else if (process.env.NODE_ENV === "prod") {
    const url = process.env.DB_URL || "";
    await mongoose.connect(url);
  }
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();

  if (isTest && mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
};

module.exports = { connectDatabase, disconnectDatabase };
