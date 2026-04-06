import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Participant" },
    ],
    roomId: String,
    password: String,
    map: String,
    startTime: Date,
    endTime: Date,
    isFinished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Match", matchSchema);
