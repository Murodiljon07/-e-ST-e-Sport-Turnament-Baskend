import User from "../models/User.js";
import Clan from "../models/Clan.js";

export const topPlayers = async (req, res) => {
  try {
    const players = await User.find({ ban: { $exists: false } })
      .sort({ trustScore: -1 })
      .limit(10)
      .select("-password");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const topClans = async (req, res) => {
  try {
    const clans = await Clan.find()
      .sort({ members: -1 })
      .limit(10)
      .populate("leader", "fullName");
    res.json(clans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
