import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: Number,
  country: String,

  games: [String],

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["player", "admin"],
    default: "player",
  },

  clan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clan",
    default: null,
  },

  clanRole: {
    type: String,
    enum: ["leader", "elder", "member"],
    default: "member",
  },

  profile: {
    avatar: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    lastActive: Date,
  },

  trustScore: { type: Number, default: 100 },

  ban: {
    reason: String,
    until: Date,
  },
});

export default mongoose.model("User", userSchema);
