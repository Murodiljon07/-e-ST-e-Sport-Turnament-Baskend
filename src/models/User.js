import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: Number,
  country: String,

  games: [
    {
      name: { type: String, required: true },
      playerId: { type: String, required: true },
    },
  ],

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

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

  profile: {
    avatar: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    lastActive: Date,
  },

  isOnline: { type: Boolean, default: false },

  trustScore: { type: Number, default: 100 },

  stats: [
    {
      game: String,
      totalKills: { type: Number, default: 0 },
      matchesPlayed: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
    },
  ],

  lastNameChange: Date,
  lastAvatarChange: Date,
  lastCredentialChange: Date,

  ban: {
    reason: String,
    until: Date,
  },

  resetOTP: String,
  resetOTPExpire: Date,
});

export default mongoose.model("User", userSchema);
