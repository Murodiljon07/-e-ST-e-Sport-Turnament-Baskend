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

// JOIN TOURNAMENT
export const joinTournament = async (req, res) => {
  try {
    const clan = await Clan.findOne({ leader: req.user.id });

    if (!clan) {
      return res.status(400).json({ msg: "Only leader can join" });
    }

    const tournament = await Tournament.findById(req.body.tournamentId);

    if (!tournament) {
      return res.status(404).json({ msg: "Tournament not found" });
    }

    // ❗ duplicate check
    if (tournament.teams.includes(clan._id)) {
      return res.status(400).json({ msg: "Already joined" });
    }

    // ❗ max limit
    if (tournament.teams.length >= tournament.maxTeams) {
      return res.status(400).json({ msg: "Tournament full" });
    }

    tournament.teams.push(clan._id);
    await tournament.save();

    res.json({ msg: "Joined tournament" });
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
export const setMatchWinner = async (req, res) => {
  try {
    const { matchId, winnerId } = req.body;

    const tournament = await Tournament.findById(req.params.id);

    const match = tournament.matches.id(matchId);

    if (!match) return res.status(404).json({ msg: "Match not found" });

    match.winner = winnerId;
    match.status = "finished";

    await tournament.save();

    res.json({ msg: "Winner set", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
