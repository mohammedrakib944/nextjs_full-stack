import mongoose from "mongoose";

// DATABASE SETUP
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("DB connected!");
  } catch (err) {
    console.log("DB error: ", err);
    throw new Error("DB connection fail");
  }
};

export default connectDB;
