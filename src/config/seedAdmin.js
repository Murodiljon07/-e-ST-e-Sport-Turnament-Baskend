import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model.js"; // User modeli

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error(err);
  }
};

const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "admin@mail.com" });
    if (existing) return console.log("Admin already exists");

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    const admin = new User({
      fullName: "Admin",
      email: "admin@mail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created ✅");
  } catch (err) {
    console.error(err);
  }
};

connectDB()
  .then(createAdmin)
  .then(() => process.exit());
