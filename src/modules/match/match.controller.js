import {
  createMatchService,
  getMatchesService,
  getMatchByIdService,
  updateMatchService,
  deleteMatchService,
} from "./match.service.js";
import { matchValidation } from "./match.validation.js";

/** Get all matches */
export const getMatches = async (req, res) => {
  const matches = await getMatchesService();
  res.json(matches);
};

/** Get match by ID */
export const getMatchById = async (req, res) => {
  const match = await getMatchByIdService(req.params.id);
  if (!match) return res.status(404).json({ message: "Match not found" });
  res.json(match);
};

/** Create match */
export const createMatch = async (req, res) => {
  const { error } = matchValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const match = await createMatchService(req.body);
  res.status(201).json(match);
};

/** Update match */
export const updateMatch = async (req, res) => {
  const { error } = matchValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateMatchService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Match not found" });
  res.json(updated);
};

/** Delete match */
export const deleteMatch = async (req, res) => {
  const deleted = await deleteMatchService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Match not found" });
  res.json({ message: "Match deleted" });
};
