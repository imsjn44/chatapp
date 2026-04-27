import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  if (!url) {
    console.log("MONGO_URL not defined!");
  }

  try {
    await mongoose.connect(url as string, {
      dbName: "Chatappmicroservices",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to db", error);
    process.exit(1);
  }
};

export default connectDB;
