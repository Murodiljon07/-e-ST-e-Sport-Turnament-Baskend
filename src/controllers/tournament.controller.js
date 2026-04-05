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
    const { tournamentId, clanId } = req.body;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    const clan = await Clan.findById(clanId).populate("members");
    if (!clan) return res.status(404).json({ msg: "Clan not found" });

    const user = await User.findById(req.user.id);

    if (
      !["leader", "elder"].includes(user.clanRole) ||
      user.clan.toString() !== clan._id.toString()
    ) {
      return res
        .status(403)
        .json({ msg: "Only leader/elder can register clan" });
    }

    // maxPlayers check
    const totalPlayers = clan.members.length;
    if (totalPlayers > tournament.maxPlayers) {
      return res
        .status(400)
        .json({ msg: "Clan members exceed tournament maxPlayers" });
    }

    // Already joined?
    const alreadyJoined = tournament.teams.some(
      (team) => team.clan.toString() === clan._id.toString(),
    );
    if (alreadyJoined)
      return res.status(400).json({ msg: "Clan already joined" });

    tournament.teams.push({
      clan: clan._id,
      members: clan.members.map((m) => m._id),
    });

    await tournament.save();

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
