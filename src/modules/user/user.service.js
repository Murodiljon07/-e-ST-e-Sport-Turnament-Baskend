import User from "../../models/user.model.js";

/** Get user by ID */
export const getUserService = async (id) => {
  return await User.findById(id).populate("clan").populate("stats");
};

/** Update user */
export const updateUserService = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

/* Ban user */
export const BanUserService = async (id, { reason, durationDays }) => {
  let banExpiresAt = null;

  if (durationDays) {
    banExpiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
  }

  return await User.findByIdAndUpdate(
    id,
    {
      isBanned: true,
      bannedAt: new Date(),
      banReason: reason,
      banExpiresAt,
      clanRole: "member",
    },
    { new: true },
  );
};

/* Unban user */
export const UnBanUserService = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      isBanned: false,
      bannedAt: null,
      banReason: null,
    },
    {
      new: true,
    },
  );
};

/* user rank calkulation */

export const updateUserStatsService = async (userId, match, tournament) => {
  const totalPoints = calculateMatchPoints(match, tournament);

  const user = await User.findById(userId);

  user.stats.totalKills += match.kills;
  user.stats.matchesPlayed += 1;
  user.stats.points += totalPoints;

  user.stats.rank = calculateRank(user.stats.points);

  await user.save();
};
