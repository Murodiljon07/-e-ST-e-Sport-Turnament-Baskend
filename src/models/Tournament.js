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

  maxTeams: { type: Number, default: 16 },

  type: {
    type: String,
    enum: ["single_elimination"],
    default: "single_elimination",
  },

  startTime: Date,

  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clan",
    },
  ],

  matches: [matchSchema],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Tournament", tournamentSchema);
