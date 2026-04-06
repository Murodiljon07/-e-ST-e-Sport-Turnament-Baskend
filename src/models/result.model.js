import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    pointsEarned: { type: Number, default: 0 },
    rankChange: {
      type: String,
      enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
    },
    stats: { type: Map, of: Number, default: {} }, // ex: kills, wins
  },
  { timestamps: true },
);

export default mongoose.model("Result", resultSchema);
