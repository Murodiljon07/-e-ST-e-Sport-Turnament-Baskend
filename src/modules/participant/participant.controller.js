import {
  createParticipantService,
  getParticipantsService,
  getParticipantByIdService,
  updateParticipantService,
  deleteParticipantService,
} from "./participant.service.js";
import { participantValidation } from "./participant.validation.js";

/** Get all participants */
export const getParticipants = async (req, res) => {
  const participants = await getParticipantsService();
  res.json(participants);
};

/** Get participant by ID */
export const getParticipantById = async (req, res) => {
  const participant = await getParticipantByIdService(req.params.id);
  if (!participant)
    return res.status(404).json({ message: "Participant not found" });
  res.json(participant);
};

/** Create participant */
export const createParticipant = async (req, res) => {
  const { error } = participantValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const participant = await createParticipantService(req.body);
  res.status(201).json(participant);
};

/** Update participant */
export const updateParticipant = async (req, res) => {
  const { error } = participantValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateParticipantService(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ message: "Participant not found" });
  res.json(updated);
};

/** Delete participant */
export const deleteParticipant = async (req, res) => {
  const deleted = await deleteParticipantService(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Participant not found" });
  res.json({ message: "Participant deleted" });
};
