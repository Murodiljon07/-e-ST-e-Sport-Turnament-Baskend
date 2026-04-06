import Result from "../../models/result.model.js";

/** Service functions */
export const getResultsService = async () => {
  return await Result.find().populate("player team tournament match");
};

export const getResultByIdService = async (id) => {
  return await Result.findById(id).populate("player team tournament match");
};

export const createResultService = async (data) => {
  const result = await Result.create(data);

  // Optional: update player or team points based on result
  if (result.player) {
    const player = await result.populate("player").execPopulate();
    player.trustScore += result.points || 0;
    await player.save();
  }

  return result;
};

export const updateResultService = async (id, data) => {
  return await Result.findByIdAndUpdate(id, data, { new: true });
};

export const deleteResultService = async (id) => {
  return await Result.findByIdAndDelete(id);
};
