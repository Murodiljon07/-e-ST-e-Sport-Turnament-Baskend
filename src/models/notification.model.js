import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["tournament_join", "match_ready", "clan_request", "system"],
    },
    isRead: { type: Boolean, default: false },
    meta: { type: Map, of: String, default: {} },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
