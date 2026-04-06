import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clan: { type: mongoose.Schema.Types.ObjectId, ref: "Clan", default: null },
    slot: { type: Number },
    roomId: String,
    roomPassword: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Participant", participantSchema);
