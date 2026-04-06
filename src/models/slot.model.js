import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
    slotNumber: Number,
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "Participant" },
    isOccupied: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Slot", slotSchema);
