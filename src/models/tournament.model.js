import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    game: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    rankRestriction: {
      min: {
        type: String,
        enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
        default: "E",
      },
      max: {
        type: String,
        enum: ["E", "D", "C", "B", "A", "S", "SS", "SSS"],
        default: "SSS",
      },
    },
    maxParticipants: { type: Number, default: 16 },
    participantsCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.model("Tournament", tournamentSchema);
