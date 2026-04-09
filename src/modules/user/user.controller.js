import User from "../../models/user.model.js";
import {
  updateUserService,
  getUserService,
  BanUserService,
  UnBanUserService,
  updateUserStatsService,
} from "./user.service.js";
import { userUpdateValidation } from "./user.validation.js";

/** Get all users */
export const getUsers = async (req, res) => {
  const users = await User.find().populate("clan").populate("stats");
  res.json(users);
};

/** Get user by ID */
export const getUserById = async (req, res) => {
  const user = await getUserService(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

/** Update user */
export const updateUser = async (req, res) => {
  const { error } = userUpdateValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedUser = await updateUserService(req.params.id, req.body);
  if (!updatedUser) return res.status(404).json({ message: "User not found" });
  res.json(updatedUser);
};

/** Delete user */
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

/*Ban user */
export const banUser = async (req, res) => {
  const { reason, durationDays } = req.body;

  const user = await BanUserService(req.params.id, {
    reason,
    durationDays,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: `User banned for ${durationDays || "permanent"} days`,
    user,
  });
};

/* Unban User */
export const unBanUser = async (req, res) => {
  const user = UnBanUserService(req.params.id);

  if (!user) return res.status(404).json({ message: "User not foynd" });

  res.json({ message: "User unbanned", user });
};
