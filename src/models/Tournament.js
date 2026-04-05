import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clan",
  },
  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clan",
  },
  round: Number, // 1 = quarter, 2 = semi, 3 = final
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clan",
  },
  status: {
    type: String,
    enum: ["pending", "finished"],
    default: "pending",
  },
  time: Date,
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
