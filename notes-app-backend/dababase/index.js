import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to db", error.message);
  }
};

export default connectionToMongoDB;
