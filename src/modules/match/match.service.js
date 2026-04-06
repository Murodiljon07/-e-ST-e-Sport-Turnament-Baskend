import Match from "../../models/match.model.js";

/** Service functions */
export const getMatchesService = async () => {
  return await Match.find()
    .populate("tournament participants")
    .sort({ round: 1 });
};

export const getMatchByIdService = async (id) => {
  return await Match.findById(id).populate("tournament participants");
};

export const createMatchService = async (data) => {
  return await Match.create(data);
};

export const updateMatchService = async (id, data) => {
  return await Match.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMatchService = async (id) => {
  return await Match.findByIdAndDelete(id);
};
