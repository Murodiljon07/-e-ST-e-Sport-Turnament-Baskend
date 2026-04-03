import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: String,
  game: String,

  type: String, // elimination

  startTime: Date,

  isPaid: {
    type: Boolean,
    default: false,
  },

  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clan",
    },
  ],

  matches: [
    {
      teamA: String,
      teamB: String,
      time: Date,
      winner: String,
      status: {
        type: String,
        default: "pending",
      },
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  image: String,
});

export default mongoose.model("Tournament", tournamentSchema);
