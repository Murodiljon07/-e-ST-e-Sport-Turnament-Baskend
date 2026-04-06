import {
  createResultService,
  getResultsService,
  getResultByIdService,
  updateResultService,
  deleteResultService,
} from "./result.service.js";
import { resultValidation } from "./result.validation.js";

/** Get all results */
export const getResults = async (req, res) => {
  const results = await getResultsService();
  res.json(results);
};

/** Get result by ID */
export const getResultById = async (req, res) => {
  const result = await getResultByIdService(req.params.id);
  if (!result) return res.status(404).json({ message: "Result not found" });
  res.json(result);
};

/** Create result */
export const createResult = async (req, res) => {
  const { error } = resultValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const result = await createResultService(req.body);
  res.status(201).json(result);
};

/** Update result */
export const updateResult = async (req, res) => {
  const { error } = resultValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateResultService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Result not found" });
  res.json(updated);
};

/** Delete result */
export const deleteResult = async (req, res) => {
  const deleted = await deleteResultService(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Result not found" });
  res.json({ message: "Result deleted" });
};
