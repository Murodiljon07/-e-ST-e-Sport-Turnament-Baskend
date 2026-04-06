import {
  createClanService,
  getClansService,
  getClanByIdService,
  updateClanService,
  deleteClanService,
} from "./clan.service.js";
import { clanValidation } from "./clan.validation.js";

/** Get all clans */
export const getClans = async (req, res) => {
  const clans = await getClansService();
  res.json(clans);
};

/** Get clan by ID */
export const getClanById = async (req, res) => {
  const clan = await getClanByIdService(req.params.id);
  if (!clan) return res.status(404).json({ message: "Clan not found" });
  res.json(clan);
};

/** Create clan */
export const createClan = async (req, res) => {
  const { error } = clanValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const clan = await createClanService(req.body);
  res.status(201).json(clan);
};

/** Update clan */
export const updateClan = async (req, res) => {
  const { error } = clanValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateClanService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Clan not found" });
  res.json(updated);
};

/** Delete clan */
export const deleteClan = async (req, res) => {
  const deleted = await deleteClanService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Clan not found" });
  res.json({ message: "Clan deleted" });
};
