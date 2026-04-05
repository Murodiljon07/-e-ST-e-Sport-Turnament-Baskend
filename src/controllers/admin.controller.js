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

// MATCH INFO
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

  const playerSlot = match.slots.find(
    (s) => s.clan.toString() === team.clan._id.toString(),
  );

  await Notification.create({
    user: player._id,
    message: `
Room ID: ${match.roomId}
Password: ${match.password}
Your Slot: ${playerSlot?.slot}
  `,
  });

  res.json({ msg: "Match info sent" });
};

// CREATE SLOT
export const assignSlots = async (req, res) => {
  const { tournamentId, matchIndex, slots } = req.body;

  const tournament = await Tournament.findById(tournamentId);

  const match = tournament.matches[matchIndex];

  match.slots = slots;

  await tournament.save();

  res.json({ msg: "Slots assigned" });
};

// Create match
export const createMatch = async (req, res) => {
  try {
    const { tournamentId, round, gameType, roomId, password } = req.body;

    const match = await Match.create({
      tournament: tournamentId,
      round,
      gameType,
      roomId,
      password,
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit results
export const submitMatchResults = async (req, res) => {
  try {
    const { matchId, results } = req.body;
    const match = await Match.findById(matchId).populate("results.user");

    if (!match) return res.status(404).json({ msg: "Match not found" });

    let totalPoints = 0;

    // Har bir player uchun points hisoblash
    const updatedResults = results.map((r) => {
      let points = 0;
      if (match.gameType === "PUBG") {
        points = (r.kills || 0) * 5 + (r.position ? 100 - r.position : 0); // misol uchun
      } else if (["CSGO", "Dota", "LoL"].includes(match.gameType)) {
        points = r.win ? 50 : 10; // misol
      } else if (match.gameType === "Chess") {
        points = r.win ? 30 : 0;
      }

      totalPoints += points;
      return { ...r, points };
    });

    match.results = updatedResults;
    match.played = true;
    await match.save();

    // Player stats update
    for (let r of updatedResults) {
      const user = await User.findById(r.user);
      if (!user.stats) user.stats = [];
      let stat = user.stats.find((s) => s.game === match.gameType);
      if (!stat) {
        user.stats.push({
          game: match.gameType,
          totalKills: r.kills || 0,
          points: r.points,
          matchesPlayed: 1,
        });
      } else {
        stat.totalKills += r.kills || 0;
        stat.points += r.points;
        stat.matchesPlayed += 1;
      }
      await user.save();

      // Clan points update
      if (user.clan) {
        const clan = await Clan.findById(user.clan);
        if (!clan.stats) clan.stats = [];
        let cstat = clan.stats.find((s) => s.game === match.gameType);
        if (!cstat) {
          clan.stats.push({ game: match.gameType, points: r.points });
        } else {
          cstat.points += r.points;
        }
        await clan.save();
      }
    }

    res.status(200).json({ msg: "Results submitted", match });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitResult = async (req, res) => {
  const { tournamentId, matchIndex, results } = req.body;

  const tournament = await Tournament.findById(tournamentId);

  const match = tournament.matches[matchIndex];

  const killPoint = match.pointRules.killPoint;
  const placementPoints = match.pointRules.placementPoints;

  const finalResults = [];

  for (const r of results) {
    // 🔥 total kill hisoblash
    const totalKills = r.players.reduce((sum, p) => sum + p.kills, 0);

    // 🔥 placement point
    const placePoint = placementPoints.get(String(r.position)) || 0;

    // 🔥 total point
    const totalPoints = totalKills * killPoint + placePoint;

    // 🔥 USER STAT UPDATE
    for (const p of r.players) {
      let user = await User.findById(p.user);

      let stat = user.stats.find((s) => s.game === tournament.game);

      if (!stat) {
        user.stats.push({
          game: tournament.game,
          totalKills: p.kills,
          matchesPlayed: 1,
          points: p.kills * killPoint,
        });
      } else {
        stat.totalKills += p.kills;
        stat.matchesPlayed += 1;
        stat.points += p.kills * killPoint;
      }

      await user.save();
    }

    // 🔥 CLAN STAT UPDATE
    let clan = await Clan.findById(r.clan);

    clan.stats.push({
      tournament: tournament._id,
      points: totalPoints,
      kills: totalKills,
    });

    await clan.save();

    finalResults.push({
      clan: r.clan,
      players: r.players,
      totalKills,
      position: r.position,
      points: totalPoints,
    });
  }

  match.results = finalResults;
  match.played = true;

  await tournament.save();

  res.json(match);
};
