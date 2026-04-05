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
    const user = await User.findById(req.user.id);
    if (user.role !== "admin")
      return res.status(403).json({ msg: "Only admin can create tournaments" });

    const {
      name,
      game,
      description,
      rules,
      image,
      maxPlayers,
      registrationDeadline,
      startTime,
    } = req.body;

    const tournament = await Tournament.create({
      name,
      game,
      description,
      rules,
      image,
      maxPlayers,
      registrationDeadline,
      startTime,
      createdBy: user._id,
      teams: [],
    });

    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateTournament = async (req, res) => {
  try {
    const {
      name,
      game,
      description,
      rules,
      image,
      maxPlayers,
      registrationDeadline,
      startTime,
    } = req.body;

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    tournament.name = name || tournament.name;
    tournament.game = game || tournament.game;
    tournament.description = description || tournament.description;
    tournament.rules = rules || tournament.rules;
    tournament.image = image || tournament.image;
    tournament.maxPlayers = maxPlayers || tournament.maxPlayers;
    tournament.registrationDeadline =
      registrationDeadline || tournament.registrationDeadline;
    tournament.startTime = startTime || tournament.startTime;

    await tournament.save();
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

// GET TURNAMENT BY ID
export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate("teams", "name members")
      .populate("createdBy", "fullName email");
    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMatchInfo = async (req, res) => {
  const { tournamentId, roomId, password } = req.body;

  const tournament =
    await Tournament.findById(tournamentId).populate("teams.members");

  for (const team of tournament.teams) {
    for (const player of team.members) {
      await Notification.create({
        user: player,
        message: `Match starting soon! Room ID: ${roomId}, Password: ${password}`,
        type: "match_info",
      });
    }
  }

  res.json({ msg: "Match info sent" });
};

// CREATE MATCH
export const createMatch = async (req, res) => {
  const { tournamentId, map, roomId, password } = req.body;

  const tournament = await Tournament.findById(tournamentId);

  tournament.matches.push({
    round: 1,
    map,
    roomId,
    password,
    results: [],
  });

  await tournament.save();

  res.json({ msg: "Match created" });
};

export const submitResult = async (req, res) => {
  const { tournamentId, matchIndex, results } = req.body;

  const tournament = await Tournament.findById(tournamentId);

  const match = tournament.matches[matchIndex];

  match.results = results.map((r) => ({
    clan: r.clan,
    players: r.players,
    totalKills: r.players.reduce((a, p) => a + p.kills, 0),
    position: r.position,
    points:
      (r.position === 1
        ? 10
        : r.position === 2
          ? 6
          : r.position === 3
            ? 5
            : 0) + r.players.reduce((a, p) => a + p.kills, 0),
  }));

  match.played = true;

  await tournament.save();

  res.json(match);
};
