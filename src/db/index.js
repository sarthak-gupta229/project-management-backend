import mongoose from "mongoose";

let conntectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection Error", error);
    process.exit(1);
  }
};

export default conntectDB;
