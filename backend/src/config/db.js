import mongoose from "mongoose";
import { env } from "./env.js";

/**
 * Connects to the configured MongoDB database.
 * @returns {Promise<typeof mongoose>}
 * @throws {mongoose.MongooseError} When the connection fails.
 */
export async function connectDatabase() {
  await mongoose.connect(env.mongoUri);
  console.log("MongoDb Connected successfully!")
}
