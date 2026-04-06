import mongoose from "mongoose";

const clanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, default: "" },
    isPublic: { type: Boolean, default: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    games: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("Clan", clanSchema);
