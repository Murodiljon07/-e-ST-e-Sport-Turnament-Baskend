import Vote from "../models/Vote.js";
import Clan from "../models/Clan.js";
import User from "../models/User.js";

// START VOTE (elder boshlaydi)
export const startVote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.clanRole !== "elder") {
      return res.status(403).json({ msg: "Only elder can start vote" });
    }

    const clan = await Clan.findById(user.clan);

    const vote = await Vote.create({
      clan: clan._id,
      candidate: user._id,
    });

    res.json(vote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VOTE
export const voteLeader = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const vote = await Vote.findById(req.body.voteId).populate("clan");

    if (!vote.isActive) {
      return res.status(400).json({ msg: "Vote ended" });
    }

    if (!vote.clan.members.includes(user._id)) {
      return res.status(403).json({ msg: "Only clan members can vote" });
    }

    const alreadyVoted = vote.votes.find(
      (v) => v.user.toString() === user._id.toString(),
    );
    if (alreadyVoted) {
      return res.status(400).json({ msg: "Already voted" });
    }

    vote.votes.push({
      user: user._id,
      value: req.body.value,
    });

    await vote.save();

    res.json({ msg: "Voted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CHECK RESULT
export const checkVote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id).populate("clan");

    const total = vote.clan.members.length;
    const yesVotes = vote.votes.filter((v) => v.value).length;

    if (yesVotes / total >= 0.7) {
      const clan = await Clan.findById(vote.clan._id);

      clan.leader = vote.candidate;
      await clan.save();

      vote.isActive = false;
      await vote.save();

      res.json({ msg: "New leader assigned" });
    } else {
      res.json({ msg: "Not enough votes yet" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
