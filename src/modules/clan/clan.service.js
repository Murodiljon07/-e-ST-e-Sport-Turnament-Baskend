import Clan from "../../models/clan.model.js";

/** Service functions */
export const getClansService = async () => {
  return await Clan.find().populate("leader members").sort({ createdAt: -1 });
};

export const getClanByIdService = async (id) => {
  return await Clan.findById(id).populate("leader members");
};

export const createClanService = async (data) => {
  return await Clan.create(data);
};

export const updateClanService = async (id, data) => {
  return await Clan.findByIdAndUpdate(id, data, { new: true });
};

export const deleteClanService = async (id) => {
  return await Clan.findByIdAndDelete(id);
};
