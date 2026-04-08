import Tournament from "../../models/tournament.model.js";
import User from "../../models/user.model.js";

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

export const joinTournamentService = async (tournamentId, userId) => {
  const tournament = await Tournament.findById(tournamentId);
  const user = await User.findById(userId).populate("clan");

  if (user.isBanned) {
    if (user.banExpiresAt && user.banExpiresAt < new Date()) {
      // auto unban
      user.isBanned = false;
      user.banExpiresAt = null;
      user.banReason = null;
      user.bannedAt = null;

      await user.save();
    } else {
      throw new Error("You are banned: " + user.banReason);
    }
  }

  if (!tournament) {
    throw new Error("Tournament not found");
  }

  // SOLO
  if (tournament.type === "solo") {
    if (tournament.players.includes(userId)) {
      throw new Error("Already joined");
    }

    if (tournament.players.length >= tournament.maxPlayers) {
      throw new Error("Tournament full");
    }

    tournament.players.push(userId);
  }

  // TEAM
  if (tournament.type === "team") {
    if (!user.clan) {
      throw new Error("Join a clan first");
    }

    if (!["leader", "elder"].includes(user.role)) {
      throw new Error("Only leader/elder can join");
    }

    const alreadyJoined = tournament.teams.includes(user.clan._id);
    if (alreadyJoined) {
      throw new Error("Clan already joined");
    }

    if (tournament.teams.length >= tournament.maxTeams) {
      throw new Error("Tournament full");
    }

    tournament.teams.push(user.clan._id);
  }

  await tournament.save();

  const io = getIO();

  io.to(tournamentId).emit("tournamentUpdated", {
    tournamentId,
    user: {
      id: user._id,
      fullName: user.fullName,
    },
  });

  return tournament;
};
