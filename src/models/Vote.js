import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan" },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: Boolean,
    },
  ],

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Vote", voteSchema);
