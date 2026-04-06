import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  totalKills: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    age: { type: Number, min: 16, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    mainGame: { type: String, required: true },
    games: [{ game: String, playerId: String }],
    rank: {
      current: {
        type: String,
        enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
        default: "E",
      },
      points: { type: Number, default: 0 },
      isManual: { type: Boolean, default: false },
    },
    stats: { type: Map, of: statSchema, default: {} },
    avatar: String,
    role: {
      type: String,
      enum: ["player", "admin"],
      default: "player",
    },
    clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan", default: null },
    clanRole: {
      type: String,
      enum: ["leader", "elder", "member"],
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
