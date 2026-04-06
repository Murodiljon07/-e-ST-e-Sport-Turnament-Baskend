import Participant from "../../models/participant.model.js";

/** Service functions */
export const getParticipantsService = async () => {
  return await Participant.find()
    .populate("player team tournament")
    .sort({ createdAt: -1 });
};

export const getParticipantByIdService = async (id) => {
  return await Participant.findById(id).populate("player team tournament");
};

export const createParticipantService = async (data) => {
  return await Participant.create(data);
};

export const updateParticipantService = async (id, data) => {
  return await Participant.findByIdAndUpdate(id, data, { new: true });
};

export const deleteParticipantService = async (id) => {
  return await Participant.findByIdAndDelete(id);
};
