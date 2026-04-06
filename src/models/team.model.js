import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan", default: null },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot" }],
  },
  { timestamps: true },
);

export default mongoose.model("Team", teamSchema);
