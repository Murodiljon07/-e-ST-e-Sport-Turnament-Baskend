import {
  createTournamentService,
  getTournamentsService,
  getTournamentByIdService,
  updateTournamentService,
  deleteTournamentService,
  joinTournamentService,
} from "./tournament.service.js";
import { tournamentValidation } from "./tournament.validation.js";

/** Get all tournaments */
export const getTournaments = async (req, res) => {
  const tournaments = await getTournamentsService();
  res.json(tournaments);
};

/** Get tournament by ID */
export const getTournamentById = async (req, res) => {
  const tournament = await getTournamentByIdService(req.params.id);
  if (!tournament)
    return res.status(404).json({ message: "Tournament not found" });
  res.json(tournament);
};

/** Create tournament */
export const createTournament = async (req, res) => {
  const { error } = tournamentValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const tournament = await createTournamentService(req.body);
  res.status(201).json(tournament);
};

/** Update tournament */
export const updateTournament = async (req, res) => {
  const { error } = tournamentValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateTournamentService(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ message: "Tournament not found" });
  res.json(updated);
};

/** Delete tournament */
export const deleteTournament = async (req, res) => {
  const deleted = await deleteTournamentService(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Tournament not found" });
  res.json({ message: "Tournament deleted" });
};

/* Join Turnament */
export const joinTournament = async (req, res) => {
  try {
    const tournament = await joinTournamentService(req.params.id, req.user.id);

    res.json({
      message: "Joined successfully",
      tournament,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
