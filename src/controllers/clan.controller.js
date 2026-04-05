import Clan from "../models/Clan.js";
import User from "../models/User.js";

// CREATE CLAN
export const createClan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.clan) {
      return res.status(400).json({ msg: "Already in a clan" });
    }

    const clan = await Clan.create({
      name: req.body.name,
      game: req.body.game,
      leader: user._id,
      members: [user._id],
      joinType: req.body.joinType || "public",
      joinCode: Math.random().toString(36).substring(2, 8),
    });

    user.clan = clan._id;
    user.clanRole = "leader";
    await user.save();

    res.json(clan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// JOIN CLAN
export const joinClan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.clan) {
      return res.status(400).json({ msg: "You must leave current clan first" });
    }

    const clan = await Clan.findById(req.body.clanId);

    if (!clan) return res.status(404).json({ msg: "Clan not found" });

    if (clan.joinType === "private") {
      if (req.body.code !== clan.joinCode) {
        return res.status(403).json({ msg: "Wrong code" });
      }
    }

    clan.members.push(user._id);
    await clan.save();

    user.clan = clan._id;
    user.clanRole = "member";
    await user.save();

    res.json({ msg: "Joined clan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LEAVE CLAN
export const leaveClan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const clan = await Clan.findById(user.clan);

    if (!clan) return res.status(404).json({ msg: "Clan not found" });

    if (user.clanRole === "leader") {
      return res.status(400).json({
        msg: "Leader cannot leave. Transfer leadership first",
      });
    }

    clan.members = clan.members.filter(
      (m) => m.toString() !== user._id.toString(),
    );

    await clan.save();

    user.clan = null;
    user.clanRole = null;
    await user.save();

    res.json({ msg: "Left clan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PROMOTE ELDER
export const makeElder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const clan = await Clan.findById(user.clan);

    if (user.clanRole !== "leader") {
      return res.status(403).json({ msg: "Only leader can promote" });
    }

    const target = await User.findById(req.body.userId);

    clan.elders.push(target._id);
    await clan.save();

    target.clanRole = "elder";
    await target.save();

    res.json({ msg: "User promoted to elder" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
