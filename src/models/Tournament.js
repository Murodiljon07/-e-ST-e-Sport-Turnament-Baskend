import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  round: Number,

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
  description: { type: String, required: true, default: "" },
  rules: { type: String, default: "" },
  image: { type: String, default: "" },

  maxPlayers: { type: Number, required: true, default: 1 },
  teams: [
    {
      clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan" },
      members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],

  registrationDeadline: { type: Date, required: true },
  startTime: { type: Date, required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin

  isPaid: { type: Boolean, default: false },
});

export default mongoose.model("Tournament", tournamentSchema);
