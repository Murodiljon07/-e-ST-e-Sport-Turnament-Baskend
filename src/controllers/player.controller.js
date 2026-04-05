import Tournament from "../models/Tournament.js";
import Match from "../models/Match.js";
import User from "../models/User.js";

// 1️⃣ Tournaments available for player
export const getPlayerTournaments = async (req, res) => {
  const userId = req.user._id;
  const tournaments = await Tournament.find({
    "teams.members": { $ne: userId },
    registrationDeadline: { $gt: new Date() },
  });
  res.json(tournaments);
};

// 2️⃣ Player's matches
export const getPlayerMatches = async (req, res) => {
  const userId = req.user._id;
  const matches = await Match.find({ "results.user": userId }).populate(
    "tournament",
  );
  res.json(matches);
};

// 3️⃣ Player slot/position
export const getPlayerMatchSlot = async (req, res) => {
  const { matchId } = req.params;
  const userId = req.user._id;
  const match = await Match.findById(matchId);

  const playerResult = match.results.find(
    (r) => r.user.toString() === userId.toString(),
  );
  if (!playerResult)
    return res.status(404).json({ msg: "Player not in this match" });

  res.json({
    slot: playerResult.slot || null,
    roomId: match.roomId,
    password: match.password,
  });
};

// 4️⃣ Player stats
export const getPlayerStats = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.stats || []);
};

// 5️⃣ Exit clan
export const exitClan = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.clan) return res.status(400).json({ msg: "You are not in a clan" });

  user.clan = null;
  user.clanRole = null;
  await user.save();

  res.json({ msg: "Exited clan successfully" });
};
