import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DB Connected Successfully")
    );
    await mongoose.connect(`${process.env.MONGO_DB_URI}/quickstay`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
