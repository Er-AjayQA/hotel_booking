import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}/quickstay`);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1); // Exit process on failure
  }
};
export default connectDB;
