import Tournament from "../models/Tournament.js";
import Clan from "../models/Clan.js";
import User from "../models/User.js";

// CREATE (ADMIN)
export const createTournament = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create tournaments" });
    }

    const tournament = await Tournament.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// JOIN TOURNAMENT (leader/elder only)
export const joinTournament = async (req, res) => {
  try {
    const { tournamentId, clanId } = req.body;

    const clan = await Clan.findById(clanId);
    if (!clan) return res.status(404).json({ msg: "Clan not found" });

    // Leader or elder check
    const user = await User.findById(req.user.id);
    if (user.clan.toString() !== clanId)
      return res.status(403).json({ msg: "You are not in this clan" });
    if (!["leader", "elder"].includes(user.clanRole))
      return res.status(403).json({ msg: "Only leader/elder can join" });

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    // Max players / max teams check
    if (tournament.teams.includes(clanId))
      return res.status(400).json({ msg: "Clan already registered" });
    if (tournament.teams.length >= tournament.maxTeams)
      return res.status(400).json({ msg: "Tournament full" });

    tournament.teams.push(clanId);
    await tournament.save();

    for (const member of clan.members) {
      await Notification.create({
        user: member,
        message: `Your clan joined ${tournament.name}`,
        type: "tournament_join",
      });
    }

    res.json({ msg: "Clan registered to tournament" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GENERATE MATCHES
export const generateMatches = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    if (tournament.matches.length > 0) {
      return res.status(400).json({ msg: "Already generated" });
    }

    let teams = [...tournament.teams];

    // 🔀 RANDOMIZE
    teams.sort(() => Math.random() - 0.5);

    const matches = [];

    // ROUND 1 (quarter)
    for (let i = 0; i < teams.length; i += 2) {
      matches.push({
        teamA: teams[i],
        teamB: teams[i + 1] || null,
        round: 1,
        status: "pending",
        time: new Date(),
      });
    }

    tournament.matches = matches;
    await tournament.save();

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MATCH WINNER
export const submitMatchResults = async (req, res) => {
  try {
    const { matchId, results } = req.body;

    const tournament = await Tournament.findById(req.params.id);

    const match = tournament.matches.id(matchId);

    if (!match) {
      return res.status(404).json({ msg: "Match not found" });
    }

    if (match.played) {
      return res.status(400).json({ msg: "Already submitted" });
    }

    const positionPoints = {
      1: 10,
      2: 6,
      3: 5,
      4: 4,
      5: 3,
      6: 2,
      7: 1,
      8: 1,
    };

    const processedResults = results.map((team) => {
      const totalKills = team.players.reduce((sum, p) => sum + p.kills, 0);

      const points = totalKills + (positionPoints[team.position] || 0);

      return {
        ...team,
        totalKills,
        points,
      };
    });

    match.results = processedResults;
    match.played = true;

    await tournament.save();

    res.json({ msg: "Results submitted", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PUBLIC TOURNAMENTS
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ startTime: 1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TOURNAMENT BY ID
export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate("teams", "name members") // clan names + members
      .populate("createdBy", "fullName email");
    if (!tournament) return res.status(404).json({ msg: "Not found" });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
