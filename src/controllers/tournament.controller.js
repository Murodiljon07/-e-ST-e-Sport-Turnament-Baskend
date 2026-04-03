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

    if (!clan) return res.status(400).json({ msg: "Only leader can join" });

    const tournament = await Tournament.findById(req.body.tournamentId);

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

    const teams = tournament.teams;

    let matches = [];

    for (let i = 0; i < teams.length; i += 2) {
      if (teams[i + 1]) {
        matches.push({
          teamA: teams[i],
          teamB: teams[i + 1],
          time: new Date(),
          status: "pending",
        });
      }
    }

    tournament.matches = matches;
    await tournament.save();

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
