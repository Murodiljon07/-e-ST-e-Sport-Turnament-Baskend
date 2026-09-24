import mongoose from "mongoose";

export const turnamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    default: new Date().toLocaleDateString("en-US", {
      timeZone: "  Asia/Tashkent",
    }),
  },

  prizePool: { type: String, required: true },
  turnamentCreatedBy: { type: String, required: true },
  game: { type: String, required: true },
  description: { type: String, required: true },
});
