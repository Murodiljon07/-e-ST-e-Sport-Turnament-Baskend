import mongoose from "mongoose";

const clanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, default: "" },

  game: { type: String, required: true },

  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  elders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  joinType: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },

  joinCode: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Clan", clanSchema);
