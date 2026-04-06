import {
  createTeamService,
  getTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
} from "./team.service.js";
import { teamValidation } from "./team.validation.js";

/** Get all teams */
export const getTeams = async (req, res) => {
  const teams = await getTeamsService();
  res.json(teams);
};

/** Get team by ID */
export const getTeamById = async (req, res) => {
  const team = await getTeamByIdService(req.params.id);
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.json(team);
};

/** Create team */
export const createTeam = async (req, res) => {
  const { error } = teamValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const team = await createTeamService(req.body);
  res.status(201).json(team);
};

/** Update team */
export const updateTeam = async (req, res) => {
  const { error } = teamValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateTeamService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Team not found" });
  res.json(updated);
};

/** Delete team */
export const deleteTeam = async (req, res) => {
  const deleted = await deleteTeamService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Team not found" });
  res.json({ message: "Team deleted" });
};
