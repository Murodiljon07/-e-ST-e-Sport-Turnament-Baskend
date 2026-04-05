import User from "../models/User.js";
import Clan from "../models/Clan.js";
import Tournament from "../models/Tournament.js";

// ================= USERS =================

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "player" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BAN USER
export const banUser = async (req, res) => {
  try {
    const { userId, reason, days } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.ban = {
      reason: reason || "No reason",
      until: new Date(Date.now() + (days || 7) * 24 * 60 * 60 * 1000),
    };

    await user.save();

    res.json({ msg: "User banned", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UNBAN USER
export const unbanUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.ban = null;
    await user.save();

    res.json({ msg: "User unbanned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);

    if (!target) return res.status(404).json({ msg: "User not found" });

    // ❗ admin o‘zini o‘chira olmaydi
    if (target._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: "You can't delete yourself" });
    }

    await target.deleteOne();

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= CLANS =================

// GET ALL CLANS
export const getClansAdmin = async (req, res) => {
  try {
    const clans = await Clan.find()
      .populate("leader", "fullName")
      .populate("members", "fullName");

    res.json(clans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE CLAN
export const deleteClanAdmin = async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);

    if (!clan) return res.status(404).json({ msg: "Clan not found" });

    // ⚡ usersdan clan ni olib tashlash
    await User.updateMany(
      { clan: clan._id },
      { $set: { clan: null, clanRole: "member" } },
    );

    await clan.deleteOne();

    res.json({ msg: "Clan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= TOURNAMENT =================

// CREATE
export const createTournament = async (req, res) => {
  try {
    const { name, game, startDate } = req.body;

    if (!name || !game) {
      return res.status(400).json({ msg: "Name and game required" });
    }

    const tournament = await Tournament.create({
      name,
      game,
      startDate,
    });

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    await tournament.deleteOne();

    res.json({ msg: "Tournament deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getTournamentsAdmin = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
