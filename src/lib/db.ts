import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/foodiesta"; // Replace with your MongoDB connection string

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // If already connected, skip
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  console.log("MongoDB Connected");
};

export default connectDB;
