import mongoose from "mongoose";

const playerResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  kills: { type: Number, default: 0 }, // Battle Royale uchun
  win: { type: Boolean, default: null }, // 5v5 yoki 1v1 uchun
  points: { type: Number, default: 0 }, // Auto calculated
});

const matchSchema = new mongoose.Schema({
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
  round: { type: Number, default: 1 },
  gameType: {
    type: String,
    required: true,
    enum: ["PUBG", "CSGO", "Dota", "LoL", "Chess"],
  },

  results: [playerResultSchema],

  played: { type: Boolean, default: false },

  // PUBG uchun optional
  roomId: { type: String, default: "" },
  password: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);
