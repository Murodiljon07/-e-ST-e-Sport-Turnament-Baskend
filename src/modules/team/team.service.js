import Team from "../../models/team.model.js";

/** Service functions */
export const getTeamsService = async () => {
  return await Team.find().populate("members");
};

export const getTeamByIdService = async (id) => {
  return await Team.findById(id).populate("members");
};

export const createTeamService = async (data) => {
  return await Team.create(data);
};

export const updateTeamService = async (id, data) => {
  return await Team.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeamService = async (id) => {
  return await Team.findByIdAndDelete(id);
};
