import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("Welcome to E-Sport Tournament API 🚀");
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
