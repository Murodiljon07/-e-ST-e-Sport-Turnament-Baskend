import User from "../../models/user.model.js";

/** Get user by ID */
export const getUserService = async (id) => {
  return await User.findById(id).populate("clan").populate("stats");
};

/** Update user */
export const updateUserService = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};
