import Tournament from "../../models/tournament.model.js";

/** Service functions */
export const getTournamentsService = async () => {
  return await Tournament.find().populate("participants").populate("matches");
};

export const getTournamentByIdService = async (id) => {
  return await Tournament.findById(id)
    .populate("participants")
    .populate("matches");
};

export const createTournamentService = async (data) => {
  return await Tournament.create(data);
};

export const updateTournamentService = async (id, data) => {
  return await Tournament.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTournamentService = async (id) => {
  return await Tournament.findByIdAndDelete(id);
};
