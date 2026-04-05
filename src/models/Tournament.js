import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  round: Number,

  roomId: String,
  password: String,
  map: String,

  results: [
    {
      clan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clan",
      },

      players: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          kills: { type: Number, default: 0 },
        },
      ],

      totalKills: Number,
      position: Number,
      points: Number,
    },
  ],

  played: {
    type: Boolean,
    default: false,
  },
});

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },

  matchType: {
    type: String,
    enum: ["battle_royale", "bracket"],
    default: "battle_royale",
  },

  description: { type: String, default: "" },
  rules: { type: String, default: "" },
  image: { type: String, default: "" },

  maxPlayers: { type: Number, required: true },

  teams: [
    {
      clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan" },
      members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],

  matches: [matchSchema], // 🔥 ENG MUHIM

  registrationDeadline: { type: Date, required: true },
  startTime: { type: Date, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  isPaid: { type: Boolean, default: false },
});

export default mongoose.model("Tournament", tournamentSchema);
