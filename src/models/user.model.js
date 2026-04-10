import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  totalKills: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  detactive: { type: Number, default: 100 },
});

const userSchema = new mongoose.Schema(
  {
    _id: String,
    avatar: String,
    fullName: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    age: { type: Number, min: 16, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    mainGame: {
      type: {
        game: String,
        playerId: String,
        gamePoint: { type: Number, default: 0 },
      },
      required: true,
    },
    games: [
      {
        game: String,
        playerId: String,
        gamePoint: { type: Number, default: 0 },
      },
    ],
    rank: {
      type: String,
      enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
      default: "E",
    },
    stats: { type: Map, of: statSchema, default: {} },
    role: { type: String, default: "player" },
    clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan", default: null },
    clanRole: {
      type: String,
      enum: ["leader", "elder", "member"],
      default: null,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    bannedAt: Date,
    banReason: {
      type: String,
      enum: ["CHEATING", "TOXIC", "AFK", "BUG_ABUSE", "TRUST_SCORE"],
      default: null,
    },
    banExpiresAt: Date,
    trustScore: { type: Number, default: 100 },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
