import mongoose from "mongoose";

const connectionToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/note-app");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to db", error.message);
  }
};

export default connectionToMongoDB;
